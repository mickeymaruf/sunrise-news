import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import NewsCard from '../Shared/NewsCard';
import CreateNewsBtn from '../News/CreateNewsBtn';
import { Pagination } from 'react-bootstrap';
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import SearchNews from '../News/SearchNews';

const Home = () => {
    const { newsCount } = useLoaderData();
    const [latestNews, setLatestNews] = useState([]);
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(0);
    const pages = Math.ceil(newsCount / size);

    useEffect(() => {
        fetch(`https://sunrise-news-server.vercel.app/news?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => setLatestNews(data.news))
    }, [page, size])
    return (
        <div>
            <div className='d-flex justify-content-between'>
                <CreateNewsBtn setLatestNews={setLatestNews} />
                <SearchNews setLatestNews={setLatestNews} />
            </div>
            {
                latestNews.map(singleNews => <NewsCard key={singleNews._id} news={singleNews}>
                    {
                        singleNews.details.length > 250 ?
                            <>{singleNews.details.slice(0, 250)} ... <Link to={`/news/${singleNews._id}`}>Read More</Link></>
                            : singleNews.details
                    }
                </NewsCard>)
            }
            <div className='d-flex'>
                <div className='mx-auto d-flex align-items-start gap-2'>
                    <Pagination>
                        {
                            [...Array(pages).keys()].map(i => <Pagination.Item
                                key={i}
                                onClick={() => setPage(i)}
                                active={i === page}
                            >
                                {i + 1}
                            </Pagination.Item>)
                        }
                    </Pagination>
                    <Form.Select onChange={e => setSize(e.target.value)} style={{ width: 'fit-content' }}>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </Form.Select>
                </div>
            </div>
        </div>
    );
};

export default Home;