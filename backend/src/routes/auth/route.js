const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendVerificationEmail } = require('../../helper/nodemailer/nodemailer');
const { hashPassword, comparePassword } = require('../../helper/bcrypt');
const { obfuscateEmail, obfuscatePhone } = require('../../helper/utils/obfuscate');
const { signAccessToken, signRefreshToken } = require('../../helper/jwt-helper');

router.post('/request-verification', async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw createError.BadRequest('Email is required');
        }

        const isRegistered = await prisma.user.findUnique({ where: { email } });
        if (isRegistered) {
            throw createError.NotFound('Email is already registered');
        }

        const verif_code = Math.floor(100000 + Math.random() * 900000).toString();
        const verification = await prisma.verification.findUnique({ where: { email } });

        const expireAt = new Date(Date.now() + 600000); 

        if (verification) {
            await prisma.verification.update({
                where: { email },
                data: { verification_code: verif_code, expiresAt: expireAt }
            });
        } else {
            await prisma.verification.create({
                data: { email, verification_code: verif_code, expiresAt: expireAt }
            });
        }

        await sendVerificationEmail(email, verif_code);

        res.status(200).send({ message: 'Verification code sent successfully' });
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.post('/register', async (req, res, next) => {
    try {
        const { email, verif_code, password, confirmPassword } = req.body;

        if (!email || !verif_code || !password || !confirmPassword) {
            throw createError.BadRequest('All fields are required');
        }
    
        if (password !== confirmPassword) {
            throw createError.BadRequest('Passwords do not match');
        }
    
        const isRegistered = await prisma.user.findUnique({ where: { email } });
        if (isRegistered) {
            throw createError.Conflict('Email is already registered');
        }

        const verification = await prisma.verification.findUnique({ where: { email } });

        if (verif_code !== verification.verification_code) {
            throw createError.BadRequest('Kode verifikasi salah');
        }

        if (verification.expiresAt < new Date()) {
            throw createError.BadRequest('Verification code has expired');
        }

        const hashedPassword = await hashPassword(password);

        await prisma.user.create({
            data: { email, password: hashedPassword }
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw createError.BadRequest('All fields are required');
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw createError.NotFound('User not found');
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            throw createError.Unauthorized('Invalid credentials');
        }

        const accessToken = await signAccessToken(user.user_id);
        const refreshToken = await signRefreshToken(user.user_id);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                username: user.username,
                email: obfuscateEmail(user.email),
                phone: obfuscatePhone(user.phone),
                roles: user.roles,
                avatar: user.avatar,
                isverified: user.isverified
            }
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/logout', async (req, res, next) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;