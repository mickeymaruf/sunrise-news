import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LeftsideNav = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5500/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, [])
    return (
        <div>
            <h4>All Category</h4>
            <div className='d-flex d-lg-block flex-lg-column flex-wrap justify-content-center' style={{columnGap: '20px'}}>
                {categories.map(category => <p key={category.id}>
                    <Link to={`/category/${category.id}`}>{category.name}</Link>
                </p>)}
            </div>
        </div>
    );
};

export default LeftsideNav;