import { useEffect, useState } from 'react'

export default function ReviewSection({ product }) {
    const [reviews, setReviews] = useState([])
    const [text, setText] = useState('')
    const [isPositive, setIsPositive] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Fetch reviews for this product
    useEffect(() => {
        let ignore = false
        setLoading(true)
        fetch(`/api/reviews/${encodeURIComponent(product)}`)
            .then(res => res.json())
            .then(data => {
                if (!ignore) {
                    setReviews(Array.isArray(data) ? data : [])
                    setLoading(false)
                }
            })
            .catch(() => { if (!ignore) setLoading(false) })
        return () => { ignore = true }
    }, [product, success])

    // Poll for review updates every 2 seconds
    useEffect(() => {
        if (!product) return
        let ignore = false
        const fetchReviews = () => {
            fetch(`/api/reviews/${encodeURIComponent(product)}`)
                .then(res => res.json())
                .then(data => {
                    if (!ignore) setReviews(Array.isArray(data) ? data : [])
                })
                .catch(() => { })
        }
        const interval = setInterval(fetchReviews, 2000)
        return () => {
            ignore = true
            clearInterval(interval)
        }
    }, [product])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        if (!text.trim()) {
            setError('Review text is required')
            return
        }
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product, is_positive: isPositive, text })
            })
            if (!res.ok) throw new Error('Failed to add review')
            setText('')
            setIsPositive(true)
            setSuccess('Review added!')
        } catch {
            setError('Failed to add review')
        }
    }

    return (
        <section style={{ marginTop: '2rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            <h2>Reviews</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
                <label>
                    <input
                        type="radio"
                        name="stance"
                        checked={isPositive}
                        onChange={() => setIsPositive(true)}
                    /> Positive
                </label>
                {' '}
                <label>
                    <input
                        type="radio"
                        name="stance"
                        checked={!isPositive}
                        onChange={() => setIsPositive(false)}
                    /> Negative
                </label>
                <br />
                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Write your review..."
                    rows={3}
                    style={{ width: '100%', marginTop: 8 }}
                />
                <br />
                <button type="submit">Add Review</button>
                {error && <div style={{ color: 'red', marginTop: 4 }}>{error}</div>}
                {success && <div style={{ color: 'green', marginTop: 4 }}>{success}</div>}
            </form>
            {loading ? <div>Loading...</div> : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {reviews.length === 0 && <li>No reviews yet.</li>}
                    {reviews.map(r => (
                        <li key={r.id} style={{ marginBottom: 12, background: '#f6f6fa', borderRadius: 8, padding: 8 }}>
                            <span style={{ color: r.is_positive ? 'green' : 'red', fontWeight: 'bold' }}>
                                {r.is_positive ? 'Positive' : 'Negative'}
                            </span>
                            <span style={{ marginLeft: 8, color: 'black' }}>{r.user || 'anonymous'}</span>
                            <span style={{ marginLeft: 8, color: 'black', fontWeight: 'bold' }}>
                                [{r.stance}]
                            </span>
                            <div style={{ marginTop: 4, color: 'black' }}>{r.text}</div>
                            <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                                {new Date(r.last_updated).toLocaleString()}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
