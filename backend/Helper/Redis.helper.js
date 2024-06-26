const redis = require('redis');

const client = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.connect();


client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = client;
