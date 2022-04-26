const express = require('express')()
const app = express()
const PORT = 8080

app.use(express.json())

app.get('/yaron', (req,res)=>{
    res.status(200).send({
        test:'success',
        nadav:10
    })
})


app.listen(
    PORT,
    () =>console.log('yaron')
)