export async function addParcel(trackingNumber) {
  const res = await fetch('/api/parcels', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tracking_number: trackingNumber })
  })
  if (!res.ok) throw new Error('Failed to add parcel')
}

export async function getParcel(trackingNumber) {
  const res = await fetch(`/api/parcels/${trackingNumber}`)
  if (!res.ok) throw new Error('Parcel not found')
  return res.json()
}

