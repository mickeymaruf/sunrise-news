import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import NewsCard from '../Shared/NewsCard';

const Home = () => {
    const allNews = useLoaderData();
    return (
        <div>
            {
                allNews.map(news => <NewsCard key={news._id} news={news}>
                    {
                        news.details.length > 250 ?
                            <>{news.details.slice(0, 250)} ... <Link to={`/news/${news._id}`}>Read More</Link></>
                            : news.details
                    }
                </NewsCard>)
            }
        </div>
    );
};

export default Home;