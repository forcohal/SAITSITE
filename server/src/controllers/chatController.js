const { getChatResponse } = require('../services/chatService');

async function handleChat(req, res, next) {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid request. Please provide a non-empty "question" field.',
      });
    }

    const answer = await getChatResponse(question.trim());
    res.json({ answer });
  } catch (err) {
    next(err);
  }
}

module.exports = { handleChat };
