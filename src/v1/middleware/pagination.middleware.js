
function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 500;
        let comparator = req.query.comparator;
        let createdAt = req.query.createdAt;
        let updatedAt = req.query.updatedAt;
        
        const isEmptyComparatorCreatedAtUpdateAt = (comparator == null || comparator == undefined) && 
            (createdAt == null || createdAt == undefined) && 
            (updatedAt == null || updatedAt == undefined);

        const pattern = /gt|lt|eq/i;
        // input validation
        validatedComparator = typeof comparator == 'string' && comparator.match(pattern) ? comparator.trim() : false;
        createdAt = !isNaN(Date.parse(createdAt));
        updatedAt = !isNaN(Date.parse(updatedAt));

        if (!isEmptyComparatorCreatedAtUpdateAt && !(comparator || createdAt || updatedAt)) return res.status(400).json({ message: "Invalid input", status: 400 });
        
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const results = {};
        let numResults = await model.countDocuments(); // all documents in the db
        if (endIndex < numResults) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }
        
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }

        // prepare condition
        const condition = {};
        const field = createdAt ? "createdAt": "updatedAt";
        const fieldValue = createdAt ?? updatedAt;
        if (comparator && fieldValue) {            
            comparator = "$".concat(comparator);
            condition[field] = { [comparator]: fieldValue };
        }

        try {
            if (Object.keys(condition).length > 0) {
                numResults = await model.find(condition, null, null).countDocuments();
                if (numResults === 0) {
                    delete results.next;
                    delete results.previous;
                }
            }
            results.total = numResults;
            results.results = await model.find(condition, null, { limit: limit, skip: startIndex });

            res.paginatedResults = results;
            next();
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}

module.exports = {
    paginatedResults
}