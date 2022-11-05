import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

const LeftsideNav = () => {
    const { categories } = useAuth();
    return (
        <div>
            <h4>All Category</h4>
            <div className='d-flex d-lg-block flex-lg-column flex-wrap justify-content-center' style={{ columnGap: '20px' }}>
                {categories.map(category => <p key={category._id}>
                    <Link to={`/category/${category._id}`}>{category.name}</Link>
                </p>)}
                <Link to={`/`}>All News</Link>
            </div>
        </div>
    );
};

export default LeftsideNav;