import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try { 
    await db.query(`SELECT 1`)
    res.status(200).json({ status: 'ok' })
  } catch (err) {
    res.status(500).json({ error: 'DB unhealthy'})
  }
})

export default router
