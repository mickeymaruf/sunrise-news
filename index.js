const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const datetime = require('node-datetime')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access' });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.decoded = decoded;
        next();
    })
}

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@cluster0.ld8a5ol.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async () => {
    try {
        const database = client.db('sunrise-news');
        const newsCollection = database.collection('news');
        const categoryCollection = database.collection('categories');
        // jwt
        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            res.send({ token });
        })

        // news
        app.get('/news', async (req, res) => {
            const options = {
                sort: { 'author.published_date': -1 }
            }
            const cursor = newsCollection.find({}, options);
            const news = await cursor.toArray();
            res.send(news);
        })
        // single news by id
        app.get('/news/:_id', async (req, res) => {
            const _id = req.params._id;
            const query = { _id: ObjectId(_id) }
            const singleNews = await newsCollection.findOne(query);
            res.send(singleNews);
        })
        // news by user email (for profile actions)
        app.get('/newsByEmail', verifyJWT, async (req, res) => {
            if (req.decoded.email !== req.query.email) {
                return res.status(401).send({ message: 'unauthorized access' });
            }
            if (!req.query.email) {
                return res.send([]);
            }
            filter = { 'author.email': req.query.email };
            const options = {
                sort: { 'author.published_date': -1 }
            }
            const cursor = newsCollection.find(filter, options);
            const news = await cursor.toArray();
            res.send(news);
        })
        app.post('/news', verifyJWT, async (req, res) => {
            const newsObj = req.body;
            // 
            newsObj.others_info = { is_todays_pick: false, is_trending: false }
            newsObj.rating = { number: 0, badge: "" }
            newsObj.total_view = 0;

            const dt = datetime.create()
            const formatted = dt.format('Y-m-d H:M:S');
            newsObj.author.published_date = formatted;
            // 
            const result = await newsCollection.insertOne(newsObj);
            res.send(result);
        })
        app.delete('/news/:_id', async (req, res) => {
            const query = { _id: ObjectId(req.params._id) };
            const result = await newsCollection.deleteOne(query);
            res.send(result);
        })

        // categories
        app.get('/categories', async (req, res) => {
            const cursor = categoryCollection.find({});
            const categories = await cursor.toArray()
            res.send(categories);
        })

        app.get('/category/:_id/', async (req, res) => {
            const options = {
                sort: { 'author.published_date': -1 }
            }
            const _id = req.params._id;
            const query = { category_id: _id };
            const cursor = newsCollection.find(query, options);
            const news = await cursor.toArray();
            res.send(news);
        })
    } finally {
        // 
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello world!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
