import React from 'react'
import { useParams } from 'react-router-dom'

const DetailedViewPage = () => {
  const params = useParams(); 
  const id = params.id; // Since we have `<Route path='card/:id' element={<DetailedViewPage />} />`
  return (
    <div>DetailedViewPage for card with ID: {id}</div>
  )
}

export default DetailedViewPage