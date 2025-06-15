import { Link } from 'react-router-dom'
import productImg from '../assets/product-29.svg'

export default function Shop() {
    return (
        <div className="shop-center">
            <h1>Shop Page</h1>
            <p>Welcome to the shop! Here you can find various items for sale.</p>
            <p>Stay tuned for more updates!</p>
            <div className="product-list">
                <Link to="/product/1" className="product-card" tabIndex={0}>
                    <img src={productImg} alt="Product 1" width={100} />
                    <span style={{ color: '#222', fontWeight: 'bold' }}>Product 1</span>
                </Link>
                <Link to="/product/2" className="product-card" tabIndex={0}>
                    <img src={productImg} alt="Product 2" width={100} />
                    <span style={{ color: '#222', fontWeight: 'bold' }}>Product 2</span>
                </Link>
                <Link to="/product/3" className="product-card" tabIndex={0}>
                    <img src={productImg} alt="Product 3" width={100} />
                    <span style={{ color: '#222', fontWeight: 'bold' }}>Product 3</span>
                </Link>
            </div>
        </div>
    )
}