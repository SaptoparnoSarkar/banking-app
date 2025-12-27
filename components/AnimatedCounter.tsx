// This component is responsible for creating an animation countUp to display the Total Account Balance. 

'use client';
import CountUp from 'react-countup'
const AnimatedCounter = ({amount} : {amount:number}) => {
  return (
    <div className='w-full'>
      <CountUp 
        duration={1}
        decimals={2}
        decimal='.'
        prefix='₹'
      end={amount} />
    </div>
  );
}

export default AnimatedCounter
