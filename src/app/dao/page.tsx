import React from 'react'
import Options from './Options'
import PriceDashboard from '@/components/ssv-token/Card'
import CryptoPieChart from '@/components/ssv-token/CryptoPieChart'

export default function page() {
  return (
    <div className='mt-[120px]'>
      <PriceDashboard/>
      <div className='mt-[50px] ml-[10%]'>
      <CryptoPieChart/>

      </div>
    </div>
  )
}
