/**
 * Create Tables
 */
export const createTable = (queryText, pool) => {
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            return pool.end();
        })
        .catch((err) => {
            console.log(err);
            return pool.end();
        });
};

/**
   * Drop Tables
 */
export const dropTable = (queryText, pool) => {
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            return pool.end();
        })
        .catch((err) => {
            console.log(err);
            return pool.end();
        });
};
