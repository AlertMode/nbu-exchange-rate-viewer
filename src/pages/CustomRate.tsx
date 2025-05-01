import React from 'react'
import { useStore } from '../store'

const CustomRate = () => {
  const { rates } = useStore()

  console.log(rates)

  return (
    <div>
      <h2>Changed Exchange Rates</h2>
    </div>
  )
}

export default CustomRate
