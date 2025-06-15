import { useEffect, useState } from 'react'
import { getParcel } from '../api'
import './ParcelList.css'

export default function ParcelList({ trackingNumbers }) {
  const [parcels, setParcels] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      Promise.all(trackingNumbers.map(getParcel))
        .then(setParcels)
        .catch(console.error)
    }, 100)
    return () => clearInterval(interval)
  }, [trackingNumbers])

  const statusClass = status =>
    'status-' + status.replace(/\s/g, '').toLowerCase()

  return (
    <ul>
      {parcels.map(p => (
        <li key={p.tracking_number}>
          <strong>{p.tracking_number}</strong> -{' '}
          <span className={statusClass(p.status)}>{p.status}</span>
        </li>
      ))}
    </ul>
  )
}
