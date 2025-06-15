import { useEffect, useState } from 'react'
import { addParcel } from '../api'

const generateTrackingNumber = () => {
  const letters = () => String.fromCharCode(65 + Math.floor(Math.random() * 26))
  const digits = () => Math.floor(100000000 + Math.random() * 900000000)
  return `${letters()}${letters()}${digits()}${letters()}${letters()}`
}

const isValidTracking = (val) => /^[A-Z]{2}[0-9]{9}[A-Z]{2}$/.test(val)

export default function AddParcelForm({ onAdd }) {
  const [tracking, setTracking] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setTracking(generateTrackingNumber())
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!isValidTracking(tracking)) {
      setError('Nieprawidłowy format numeru przesyłki')
      return
    }

    try {
      await addParcel(tracking)
      onAdd(tracking)
      setTracking(generateTrackingNumber())
    } catch (err) {
      if (err.message.includes('409')) {
        setError('Taki numer paczki już istnieje')
      } else {
        setError('Wystąpił błąd podczas dodawania paczki')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <strong>Numer przesyłki</strong> powinien mieć format:
        <br />
        <code>AA123456789BB</code> (2 litery + 9 cyfr + 2 litery)
      </p>

      <input
        value={tracking}
        onChange={e => setTracking(e.target.value.toUpperCase())}
        placeholder="AA123456789BB"
        maxLength={13}
      />
      <button type="submit">Dodaj paczkę</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
