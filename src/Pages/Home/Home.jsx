import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import NewsCard from '../Shared/NewsCard';
import { Helmet } from 'react-helmet-async';
import CreateNewsBtn from '../News/CreateNewsBtn';

const Home = () => {
    // useDocumentTitle('Home');
    const allNews = useLoaderData();
    const [latestNews, setLatestNews] = useState(allNews);
    return (
        <div>
            {/* <Helmet>
                <title>Hello World</title>
            </Helmet> */}
            <CreateNewsBtn setLatestNews={setLatestNews} />
            {
                latestNews.map(news => <NewsCard key={news._id} news={news}>
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