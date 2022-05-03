const express = require('express')()
const jobsRoutes = require('./src/jobs/routs');

const app = express()
const PORT = 8080

app.use(express.json())

app.get('/yaron', (req,res)=>{
    res.status(200).send({
        test:'success',
        nadav:10
    })
})


app.use('/api/v1/jobs', jobsRoutes);

// app.listen(
//     PORT,
//     () =>console.log('yaron')
// )