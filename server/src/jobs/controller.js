const pool = require('../../postgres_db');
const queries = require('./queries');

const getAllJobs = (req,res) => {
    pool.query(queries.getAllJobs, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

const getAllUncompletedJobs = (req,res) => {
    pool.query(queries.getAllUncompletedJobs, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}


const addNewAlert = (req,res) => {
    const { email, restaurant} = req.body;
// check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send("Email Already Exists.");
        }
        // add alert into db
        pool.query(queries.addNewAlert, [email, restaurant], (error, results) => {
            if (error) throw error;
            res.status(201).send("Alert Created Successfully!");
            console.log("Alert Created");
        })
    });
};

const removeEmail = (req, res) => {
    const email = req.params.email;
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        const noEmailFound = !results.rows.length;
        if (noEmailFound) {
            res.send("Emails does not exist in the database.");
        }

        pool.query(queries.removeEmail, [email], (error, results) => {
            if (error) throw error;
            res.status(200).send("Email Removed Successfully.");
        });
    });
}


module.exports = {
    addNewAlert,
    getAllJobs,
    getAllUncompletedJobs,
    removeEmail
}