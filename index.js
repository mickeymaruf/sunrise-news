const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const datetime = require('node-datetime')
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@cluster0.ld8a5ol.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async () => {
    try {
        const database = client.db('sunrise-news');
        const newsCollection = database.collection('news');
        const categoryCollection = database.collection('categories');
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
        app.post('/news', async (req, res) => {
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
