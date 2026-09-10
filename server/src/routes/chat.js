const { Router } = require('express');
const { handleChat } = require('../controllers/chatController');

const router = Router();

router.post('/chat', handleChat);

module.exports = router;
