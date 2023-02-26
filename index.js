const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const { response } = require('express');
const MOCK_API = "https://jsonplaceholder.typicode.com/users/";
const redis = require('redis');

(async () => {
  try {
    const client = redis.createClient({ socket: { port: 6379 } });
    await client.connect();
    console.log('connected');
  } catch (err) {
    console.error(err)
  }
})()

app.get('/cache/user/:email', async(req,res)=>{

    const email = req.params.email;
    console.log(email)
    try {

     redisClient.get(email, async (error, response)=>{
        if(response) {
            console.log("response got from redis");
            res.status(200).send(response)
        }
        else {
            const response = await axios.get(`${MOCK_API}?email=${email}`)
            const user = response.data;
            redisClient.setEx(email, 600, JSON.stringify(user));
            console.log("response got form api")
            res.status(200).send(user)
        }
     })

    }
    catch(error){
        throw error;
    }
})

const PORT = process.env.port || 3000

app.listen(PORT, ()=>{
    console.log("app is listening on the port", PORT)
})