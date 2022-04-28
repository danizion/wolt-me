// const express = require('express')()
// const app = express()
// const PORT = 8080
//
// app.use(express.json())
//
// app.get('/yaron', (req,res)=>{
//     res.status(200).send({
//         test:'success',
//         nadav:10
//     })
// })
//
//
// app.listen(
//     PORT,
//     () =>console.log('yaron')
// )


var express = require('express');
var app = express();
var PORT = 8080;

app.get('/search', async function (req, res) {
    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'https://restaurant-api.wolt.com/v1/pages/search?q=mex&lat=32.087236876497585&lon=34.78698525756491',
        headers: {
            'accept': 'application/json, text/plain, */*'
        }
    };

    const resJsn = await axios(config)
        .then(function (response) {
            return parseRestaurants(response.data)
            // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

    // Before res.send()
    console.log(res.headersSent);
    res.send(resJsn);
});



app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

//parse the result json from https://restaurant-api.wolt.com/v1/pages/search?q={query}&lat=32.087236876497585&lon=34.78698525756491
function parseRestaurants (response){
    const items = response["sections"][0]["items"]
    let parsedRes = []
    for (const itemIndx in items){
        const restaurant = {'name':items[itemIndx].title, 'slug':items[itemIndx].venue.slug}
        // console.log("name - "+items[itemIndx].title +" uniqe name for api - "+items[itemIndx].venue.slug)
        parsedRes.push(restaurant)
    }
    return parsedRes
}