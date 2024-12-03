const db = require('../db');

const executeQuery = (query, params, callback) => {
    db.execute(query, params)
        .then(([rows]) => callback(null, rows))
        .catch((error) => callback(error, null));
};

module.exports = {
    executeQuery,
};
