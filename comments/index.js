const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());

const comments = {};

app.get('/comments', (req, res)=>{
    res.status(200).json({comments: comments});
});

app.post('/comments', async (req, res)=>{
    let id = randomBytes(8);
    id = id.toString('hex');
    let { postID, comment } = req.body;
    comments[id] = { id, postID, comment, status:0 }
    await axios.post('http://localhost:3005/event',{type:'newComment', content: comments[id]});
    res.status(200).json({message: 'Commneted successfully.', comment: comments[id]});
});

app.post('/event', (req, res) => {
    
})

app.listen(3001, ()=>{
    console.log('Comment service started on 3001');
})