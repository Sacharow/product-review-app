import { useParams } from 'react-router-dom'
import productImg from '../assets/product-29.svg'
import ReviewSection from './ReviewSection'

const productData = {
    1: { name: 'Product 1', description: 'This is the first product.' },
    2: { name: 'Product 2', description: 'This is the second product.' },
    3: { name: 'Product 3', description: 'This is the third product.' },
}

export default function Product() {
    const { id } = useParams()
    const product = productData[id]

    if (!product) {
        return <h2>Product not found</h2>
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h1>{product.name}</h1>
            <img src={productImg} alt={product.name} width={150} />
            <p>{product.description}</p>
            <ReviewSection product={product.name} />
        </div>
    )
}