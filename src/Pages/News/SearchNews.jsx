import React from 'react';
import { Form } from 'react-bootstrap';

const SearchNews = ({ setLatestNews }) => {
    const handleSearch = e => {
        e.preventDefault();
        const search = (e.target.search.value).trim();
        if (search) {
            fetch(`https://sunrise-news-server.vercel.app/news?search=${search}`)
                .then(res => res.json())
                .then(data => {
                    setLatestNews(data.news)
                    e.target.reset();
                })
                .catch(err => console.log(err));
        }
    }
    return (
        <div>
            <Form onSubmit={handleSearch} className="d-flex">
                <Form.Control
                    type="search"
                    name="search"
                    placeholder="Press Enter to Search"
                    className="me-2"
                    aria-label="Search"
                />
            </Form>
        </div>
    );
};

export default SearchNews;