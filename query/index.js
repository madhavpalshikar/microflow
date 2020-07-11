const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/query', (req,res)=>{
    res.status(200).json({posts: posts});
});

app.post('/event', (req, res) => {
    let {type, content} = req.body;
    console.log(req.body);
    switch(type){
        case 'newPost':
            posts[content.id] = {id: content.id, content: content.content, comments:[]};
            break;

        case 'newComment': 
            let post = posts[content.postID]; 
            post.comments.push(content);
            break;
    }    
    res.status(200).json({message: 'ok'});
});

app.listen(3002, ()=>{
    console.log('Query started on 3002');
})