const express = require('express');
const cors= require('cors');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const app = express();

app.use(express.json());
app.use(cors());

let postIdCounter =1;

readFileAsync('./postIdCounter.txt', 'utf8')
    .then (data => {
        postIdCounter = parseInt(data) || 0;
        console.log('postIdCounter:', postIdCounter);
    })
    .catch(err => {
        console.error('Error reading postIdCounter file', err);
    });
const writeCounterToFile = async () => {
    try {
        await writeFileAsync('./postIdCounter.txt', postIdCounter.toString());
        console.log('postIdCounter written to file');
    } catch (err) {
        console.error('Error writing postIdCounter to file:', err);
    }
}

app.post('/', async (req, res) => {
    try {
        const postData = req.body; //assuming post data is sent in POST BODY
        console.log("recieved post data");

        const currentDate = new Date();
        const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
        postData.createdAt = formattedDate;

        let data = await readFileAsync('./posts.json', 'utf8');

        let posts = { postArray: []};
        if (data) {
            posts = JSON.parse(data);
        }
        if (!posts.postArray) {
            posts.postArray = [];
        }

        postData.postId = postIdCounter++;
        await writeCounterToFile();

        posts.postArray.push(postData);

        await writeFileAsync('./posts.json', JSON.stringify(posts, null, 2));

        console.log('Post saved successfully server side');
        res.status(200).send('Post saved successfully server side');

    } catch (err) {
        console.error('Error server side:', err);
        res.status(500).send('serverside error saving');
    }
        
});
app.get('/posts', async (req, res) => {
    try {
        let data = await readFileAsync('./posts.json', 'utf8');
        let posts = data ? JSON.parse(data) : { postArray : [] };
        res.json(posts);
    } catch (err) {
        console.error('Error reading posts:', err);
        res.status(500).send('Error reading posts');
    }
});

app.get('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        let data = await readFileAsync('./posts.json', 'utf8');
        let posts = data ? JSON.parse(data).postArray : [];
        
        const post = posts.find(post => post.postId === parseInt(postId));
        if (post) {
            res.json(post);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).send('Error fetching post');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});