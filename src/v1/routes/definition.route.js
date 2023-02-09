const express = require('express');
const router = express.Router();

const { paginatedResults } = require('./../middleware/pagination');
const { authenticateJWT } = require('./../middleware/auth');
const Definition = require('./../../../mongo/models/definitions');


router
    .route('/')
    /**
     * all definitions
     */
    .get(authenticateJWT, paginatedResults(Definition), (_, res, __) => {
        return res.json(res.paginatedResults)
    });

   

module.exports = router;
