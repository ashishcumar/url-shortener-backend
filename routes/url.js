const express = require('express');
const { generateShortUrl,redirectUrl, getRedirectUrlAnalytics } = require('../controllers/url');
const router = express.Router();


router.post('/url/',generateShortUrl)
router.get('/:id',redirectUrl)
router.get('/url-analytics/:id',getRedirectUrlAnalytics)

module.exports = router