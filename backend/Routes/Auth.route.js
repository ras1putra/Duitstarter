const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { registerSchema } = require('../Helper/Validation.schema');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../Helper/JWT.helper');
const client = require('../Helper/Redis.helper');

router.post('/register', async (req, res, next) => {
    try {
        const { value, error} = registerSchema.validate(req.body);
        if(error) { throw createError.BadRequest("Email or password or confirm password is not valid") };

        const checkUser = await prisma.user.findUnique({
            where: {
                email: value.email
            }
        });
        if (checkUser) {
            throw createError.Conflict(`${value.email} is already registered`);
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(value.password, salt);

        const newUser = await prisma.user.create({
            data: {
                email: value.email,
                password: hashedPassword
            }
        });

        res.send("User registered successfully");
    } catch (error) {
        next(error)
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            throw createError.NotFound("User not registered");
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw createError.Unauthorized("Username/password not valid");
        };

        const accessToken = await signAccessToken(user.user_id);
        const refreshToken = await signRefreshToken(user.user_id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/'
        });
        res.send({ accessToken });
    } catch (error) {
        if(error.isJoi === true) {
            return next(createError(400, 'Invalid email/password'))
        }
        next(error)
    }
});

router.delete('/logout', async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            throw createError.BadRequest();
        }

        const userId = await verifyRefreshToken(refreshToken);
        await client.del(userId)
        res.send("success logout")
    } catch (error) {
        next(error)
    }
});

router.post('/refresh-token', async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const userId = await verifyRefreshToken(refreshToken);

        const accessToken = await signAccessToken(userId);
        res.send({ accessToken });
    } catch (error) {
        next(error)
    }
});

module.exports = router;