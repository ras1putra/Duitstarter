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

router.post('/kyc-level-1', verifyAccessToken, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: req.payload.aud
            }
        });
        if (!user) {
            throw createError.NotFound("User not found");
        }

        const duplicate = await prisma.kyc_level_1.findUnique({
            where: {
                user_id: req.payload.aud
            }
        });

        if (duplicate) {
            throw createError.Conflict("KYC Level 1 data already submitted");
        }

        const { full_name, nik, gender, tanggal_lahir, address, kecamatan, kota, provinsi, kode_pos } = req.body;

        const foto_ktp_depan = req.files[0].buffer;
        const foto_ktp_belakang = req.files[1].buffer;
        const foto_selfie = req.files[2].buffer;

        console.log(foto_ktp_depan);
        console.log(foto_ktp_belakang);
        console.log(foto_selfie);

        const postKYC = await prisma.kyc_level_1.create({
            data: {
                full_name: full_name,
                nik: nik,
                jenis_kelamin: gender,
                tanggal_lahir: tanggal_lahir,
                user: {
                    connect: {
                        user_id: user.user_id
                    }
                }
            }
        });

        const kyc_level_1_id = postKYC.kyc_level_1_id;

        await prisma.foto_dokumen.create({
            data: {
                foto_ktp_depan: foto_ktp_depan,
                foto_ktp_belakang: foto_ktp_belakang,
                foto_selfie: foto_selfie,
                kyc_level_1: {
                    connect: {
                        kyc_level_1_id: kyc_level_1_id
                    }
                }
            }
        });

        await prisma.address.create({
            data: {
                address: address,
                kecamatan: kecamatan,
                kota: kota,
                provinsi: provinsi,
                kode_pos: kode_pos,
                kyc_level_1: {
                    connect: {
                        kyc_level_1_id: kyc_level_1_id
                    }
                }
            }
        });

        res.status(200).send({ message: "KYC Level 1 data submitted successfully" });
    } catch (error) {
        console.error('Error submitting KYC Level 1:', error);
        next(error);
    }
});

router.get('/kyc-level-1', verifyAccessToken, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: req.payload.aud
            }
        });

        if (!user) {
            throw createError.NotFound("User not found");
        }

        if (user.roles !== 'ADMIN') {
            throw createError.Forbidden("Unauthorized");
        }

        const kyc = await prisma.kyc_level_1.findMany({
            include: {
                foto_dokumen: true,
                address: true
            }
        });

        console.log(kyc);

        res.status(200).json(kyc);
    } catch (error) {
        console.error(error);
        if (error instanceof createError.HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
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
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/foto-ktp-depan/:userId', verifyAccessToken, checkIsAdmin, async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const kyc = await prisma.kyc_level_1.findUnique({
            where: {
                user_id: userId
            }
        });

        const image = await prisma.foto_dokumen.findUnique({
            where: {
                kyc_level_1_id: kyc.kyc_level_1_id
            }
        });

        res.set('Content-Type', 'image/png');
        res.send(image.foto_ktp_depan);        
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/foto-ktp-belakang/:userId', verifyAccessToken, checkIsAdmin, async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const kyc = await prisma.kyc_level_1.findUnique({
            where: {
                user_id: userId
            }
        });

        const image = await prisma.foto_dokumen.findUnique({
            where: {
                kyc_level_1_id: kyc.kyc_level_1_id
            }
        });

        res.set('Content-Type', 'image/png');
        res.send(image.foto_ktp_belakang);        
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/foto-selfie/:userId', verifyAccessToken, checkIsAdmin, async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const kyc = await prisma.kyc_level_1.findUnique({
            where: {
                user_id: userId
            }
        });

        const image = await prisma.foto_dokumen.findUnique({
            where: {
                kyc_level_1_id: kyc.kyc_level_1_id
            }
        });

        res.set('Content-Type', 'image/png');
        res.send(image.foto_selfie);        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = router;
