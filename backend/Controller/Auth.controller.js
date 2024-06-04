const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { registerSchema } = require('../Helper/Validation.schema');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../Helper/JWT.helper');
const client = require('../Helper/Redis.helper');

module.exports = {
    registerUser: async (req, res, next) => {
        try {
            const { value, error} = registerSchema.validate(req.body);
            if(error) { throw createError.BadRequest("Email or password is not valid, please check") };
    
            const checkUser = await prisma.user.findUnique({
                where: {
                    email: value.email
                }
            });
            if (checkUser) {
                throw createError.Conflict(`${value.email} sudah terdaftar, coba email lainnya`);
            };
    
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(value.password, salt);
    
            const newUser = await prisma.user.create({
                data: {
                    email: value.email,
                    password: hashedPassword
                }
            });
    
            res.status(200).send("User registered successfully");
        } catch (error) {
            next(error)
        }
    },
    loginUser: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw createError.NotFound("Tidak ada user terdaftar dengan email tersebut");
            };
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw createError.Unauthorized("Email atau password salah");
            };
    
            const accessToken = await signAccessToken(user.user_id);
            const refreshToken = await signRefreshToken(user.user_id);
    
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                path: '/'
            });
    
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/'
            });
    
            res.status(200).send("Success login");
        } catch (error) {
            if(error.isJoi === true) {
                return next(createError(400, 'Invalid email/password'))
            }
            next(error)
        }
    },
    logoutUser: async (req, res, next) => {
        try {
            const userId = req.payload.aud;
            await client.del(userId);
    
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.status(200).send("success logout");
        } catch (error) {
            next(error);
        }
    },
    requestAccessToken: async (req, res, next) => {
        try {
            const userId = req.payload.aud;
            const accessToken = await signAccessToken(userId);
    
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                path: '/'
            });
            res.status(200).send({ accessToken });
        } catch (error) {
            next(error);
        }
    }

};