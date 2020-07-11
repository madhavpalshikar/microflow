const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res)=>{
    res.status(200).json({posts: posts});
});

app.post('/posts', async (req, res)=>{
    let id = randomBytes(8);
    id = id.toString('hex');
    let { title, content } = req.body;
    posts[id] = { id, title, content }
    await axios.post('http://localhost:3005/event', {type: 'newPost', content: posts[id]});
        res.status(200).json({message: 'Posted successfully.', post: posts[id]});
});

app.post('/event', (req, res) => {
    
});

app.listen(3000);