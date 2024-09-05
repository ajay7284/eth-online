import React from 'react'
import MarqueeDemo from "../components/magicui/MarqueeDemo";
import NumberTicker from './lib/Count';
import NumberTickerDemo from './magicui/NumberTickerDemo';
import { GradualSpacingDemo } from './magicui/GradualSpacingDemo';
import { FlipTextDemo } from './magicui/FlipTextDemo';
import NumberData from './NumberData';

export default function Hero() {
  return (
    <div className='ml-[80px] bg-black'>
      <GradualSpacingDemo/>
      <FlipTextDemo/>
      <NumberData/>
      <MarqueeDemo />
     </div>
  )
}
