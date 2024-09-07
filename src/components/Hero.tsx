import React from 'react'
import MarqueeDemo from "../components/magicui/MarqueeDemo";
import NumberTicker from './lib/Count';
import NumberTickerDemo from './magicui/NumberTickerDemo';
import { GradualSpacingDemo } from './magicui/GradualSpacingDemo';
import { FlipTextDemo } from './magicui/FlipTextDemo';
import DataTable from './DataTable';
import ValidatorsTable from './ValidatorsTable';

export default function Hero() {
  return (
    <div className=' ' 
    >
      <GradualSpacingDemo/>
      <FlipTextDemo/>
      <MarqueeDemo /> 
     </div>
  )
}
