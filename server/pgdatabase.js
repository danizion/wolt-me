const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5433,
    password: "Luz147852!",
    database:"jobs_db"
})

module.exports = client;

// client.connect();

// client.query('select * from emails_restaurants where "completed" = false', (err, res) => {
//     if(!err){
//         console.log(res.rows);
//     }else {
//         console.log(err.message);
//     }
//     client.end;
// })

// export function get_all() {
//     let res = client.query('select * from emails_restaurants where "completed" = false')
//     if(!err){
//         console.log(res.rows);
//         return res.rows;
//     }else {
//         console.log(err.message);
//         return err.message
//     }
//     client.end;
// }