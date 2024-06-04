const express = require('express');
const router = express.Router();
const { verifyRefreshToken } = require('../Helper/JWT.helper');
const { registerUser, loginUser, logoutUser, requestAccessToken } = require('../Controller/Auth.controller');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.delete('/logout', verifyRefreshToken, logoutUser);

router.post('/refresh-token', verifyRefreshToken, requestAccessToken);

module.exports = router;