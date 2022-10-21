const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5500

const categories = require('./data/categories.json')
const news = require('./data/news.json')

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/categories', (req, res) => {
    res.send(categories);
})

app.get('/category/:id', (req, res) => {
    const id = req.params.id;
    let category_news = news.filter(n => n.category_id === id);
    if (id === '08') {
        category_news = news;
    }
    res.send(category_news);
})

app.get('/news', (req, res) => {
    res.send(news);
})

app.get('/news/:id', (req, res) => {
    const id = req.params.id;
    res.send(news.find(n => n._id === id));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
