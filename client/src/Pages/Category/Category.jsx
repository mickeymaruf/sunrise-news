import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import NewsCard from '../Shared/NewsCard';

const Category = () => {
    const categoryNews = useLoaderData();
    return (
        <div>
            {
                categoryNews.length ?
                    categoryNews.map(news => <NewsCard key={news._id} news={news}>
                        {
                            news.details.length > 250 ?
                                <>{news.details.slice(0, 250)} ... <Link to={`/news/${news._id}`}>Read More</Link></>
                                : news.details
                        }
                    </NewsCard>)
                    :
                    <h1 className='lead fs-1'>Nothings Found!</h1>
            }
        </div>
    );
};

export default Category;