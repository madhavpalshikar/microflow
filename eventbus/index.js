const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/event', async (req, res) => {
    console.log(req.body);
    let event = req.body;
    await axios.post('http://localhost:3002/event', event);
    res.status(200).send('Success!');
})

app.listen(3005, ()=>{
    console.log('Eventbus has started!');
});