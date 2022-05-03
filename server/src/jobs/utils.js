const pool = require('../../postgres_db');
const queries = require('./queries');

const checkChangesRestaurants = (req,res) => {
    pool.query(queries.getAllUncompletedJobs, (error, results) => {
        if (error) throw error;
        // check if restaurats is open, if so add to emails array, with restaurant name and delete the alert from the db
    })
}
