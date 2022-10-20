import React from 'react';
import { useLoaderData } from 'react-router-dom';
import NewsCard from '../Shared/NewsCard';

const News = () => {
    const news = useLoaderData();
    console.log(news)
    return (
        <NewsCard news={news}>
            {news.details}
        </NewsCard>
    );
};

export default News;