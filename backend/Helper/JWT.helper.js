const JWT = require('jsonwebtoken');
const client = require('./Redis.helper');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '1h',
                issuer: 'localhost',
                audience: userId
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized());
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                return next(createError.Unauthorized(message));
            }
            req.payload = payload;
            next();
        });
    },
    signRefreshToken: async (userId) => {
        try {
            const haveToken = await client.get(userId);
            if (haveToken) {
                await client.del(userId);
            }
    
            const token = await new Promise((resolve, reject) => {
                const payload = {};
                const secret = process.env.REFRESH_TOKEN_SECRET;
                const options = {
                    expiresIn: '1y',
                    issuer: 'localhost',
                    audience: userId
                };
                JWT.sign(payload, secret, options, async (err, token) => {
                    if (err) {
                        reject(createError.InternalServerError());
                    }
                    client.set(userId, token, { EX: 30 * 24 * 60 * 60, NX: true });
                    resolve(token);
                });
            });

            return token;
        } catch (error) {
            throw createError.InternalServerError();
        }
    },
    verifyRefreshToken: async (refreshToken) => {
        try {
            const payload = await new Promise((resolve, reject) => {
                JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                    if (err) return reject(createError.Unauthorized());
                    resolve(payload);
                });
            });
    
            const userId = payload.aud;
            const res = await client.get(userId); 
            
            if (refreshToken === res) {
                return userId;
            } else {
                throw createError.Unauthorized();
            }
        } catch (err) {
            throw createError.Unauthorized();
        }
    }
    
}
