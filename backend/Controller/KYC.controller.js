const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { registerSchema } = require('../Helper/Validation.schema');
const { signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken } = require('../Helper/JWT.helper');
const client = require('../Helper/Redis.helper');
const { checkIsAdmin } = require('../Controller/KYC.controller');

module.exports = {
    checkIsAdmin: async (req, res, next) => {
        const user = await prisma.user.findUnique({
            where: {
                user_id: req.payload.aud
            }
        });
        
        if (user.roles !== 'ADMIN') {
            return next(createError.Forbidden("Unauthorized"));
        }
        next();
    },
}



