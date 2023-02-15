const express = require('express');
const router = express.Router();

const { paginatedResults } = require('../middleware/pagination.middleware');
const { authenticateApiKey } = require('../middleware/auth.middleware');
const Definition = require('./../../../mongo/models/definitions');


router
    .route('/')
    /**
     * all definitions
     */
    .get(authenticateApiKey, paginatedResults(Definition), (_, res, __) => {
        return res.json(res.paginatedResults)
    });

   

module.exports = router;
