const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { registerSchema } = require('../Helper/Validation.schema');
const { signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken } = require('../Helper/JWT.helper');
const client = require('../Helper/Redis.helper');

router.get('/user', verifyAccessToken, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: req.payload.aud
            },
        });

        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;

        res.status(200).send(userWithoutPassword);
    } catch (error) {
        next(error);
    }
});

router.put('/user', verifyAccessToken, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: req.payload.aud
            }
        });
        if (!user) {
            throw createError.NotFound("User not found");
        }

        const { username, phone } = req.body;
        const avatar = req.files[0].buffer;

        const updatedUser = await prisma.user.update({
            where: {
                user_id: req.payload.aud
            },
            data: {
                username: username,
                phone: phone,
                avatar: avatar 
            }
        });

        res.status(200).send("User updated successfully");
    } catch (error) {
        next(error);
    }
});

router.get('/avatars/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await prisma.user.findUnique({
            where: {
                user_id: userId
            }
        });
        if (!user || !user.avatar) {
            return res.status(404).send('Avatar not found');
        }
        res.set('Content-Type', 'image/png'); // Atur tipe konten sesuai dengan tipe file avatar
        res.send(user.avatar);
    } catch (error) {
        console.error('Error retrieving avatar:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
