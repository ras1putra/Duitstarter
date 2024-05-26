const joi = require('@hapi/joi');

const registerSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(8).required().pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$')),
    confirmPassword: joi.any().valid(joi.ref('password')).required()
});

module.exports = {
    registerSchema
}