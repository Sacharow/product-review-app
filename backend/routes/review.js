import express from 'express'
import db from '../db.js'

const router = express.Router()

// Add a review (starts with 'Sent' stance)
router.post('/', async (req, res) => {
    const { product, is_positive, text, user = 'anonymous' } = req.body
    try {
        await db.query(
            `INSERT INTO reviews (product, stance, is_positive, text, user) VALUES ($1, 'Sent', $2, $3, $4)`,
            [product, is_positive, text, user]
        )
        res.status(201).json({ message: 'Review added' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'DB insert error' })
    }
})

// Get all reviews for a product
router.get('/:product', async (req, res) => {
    const { product } = req.params
    try {
        const result = await db.query(
            'SELECT * FROM reviews WHERE product = $1 ORDER BY last_updated DESC',
            [product]
        )
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'DB read error' })
    }
})

export default router