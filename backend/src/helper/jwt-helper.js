const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '15m',
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
        const token = req.cookies.accessToken;
        if (!token) return next(createError.Unauthorized());
    
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    return next(createError.Unauthorized('Invalid token'));
                } else if (err.name === 'TokenExpiredError') {
                    return next(createError(403, 'Token expired'));
                } else {
                    return next(createError.Unauthorized('Unauthorized'));
                }
            }
            req.payload = payload;
            next();
        });
    },
    signRefreshToken: async (userId) => {
        try {
              const token = await new Promise((resolve, reject) => {
                const payload = {};
                const secret = process.env.REFRESH_TOKEN_SECRET;
                const options = {
                    expiresIn: '4d',
                    issuer: 'localhost',
                    audience: userId
                };
                JWT.sign(payload, secret, options, async (err, token) => {
                    if (err) {
                        reject(createError.InternalServerError());
                    }
                    resolve(token);
                });
            });

            return token;
        } catch (error) {
            throw createError.InternalServerError();
        }
    },
    verifyRefreshToken: async (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return next(createError.Unauthorized('No refresh token provided'));

        try {
            const payload = await new Promise((resolve, reject) => {
                JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                    if (err) return reject(createError.Unauthorized());
                    resolve(payload);
                });
            });
            
            const userId = payload.aud;
            const storedToken = await client.get(userId); 
            
            if (refreshToken === storedToken) {
                req.payload = payload;
                next();
            } else {
                throw createError.Unauthorized('Refresh token mismatch');
            }
        } catch (err) {
            console.error('Failed to verify refresh token:', err);
            next(createError.Unauthorized('Failed to verify refresh token'));
        }
    }
    
}
