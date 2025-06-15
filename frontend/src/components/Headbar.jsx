import { Link } from 'react-router-dom'

export default function Headbar() {
    return (
        <header className="headbar">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/account">Account</Link>
                <Link to="/shop">Shop</Link>
            </nav>
        </header>
    )
}