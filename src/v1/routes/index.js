const express = require('express');

const authRouter = require('./auth.route');
const definitionRouter = require('./definition.route');
const keyRouter = require('./key.route');

const router = express.Router();


/**
 * GET api/v1/ status check
 */
router.get('/', (_, res) => {
    res.json({'message': 'ok'});
});

router.use('/definitions', definitionRouter);

router.use('/auth', authRouter);

router.use('/key', keyRouter);



module.exports = router;