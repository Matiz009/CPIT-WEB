import React, { useEffect, useState } from 'react'

export const State = () => {
    const [counter,setCounter]= useState(0);
    function increment(){
        setCounter(counter+1);
    }
    function decrement(){
     if(counter>0){
         setCounter(counter-1);
     }
    }
    useEffect(()=>{
        console.log("Counter value changed: ",counter);
    },[decrement])
  return (
    <div>
        <h1>Counter: {counter}</h1>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={increment}>Increment</button>
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={decrement}>Decrement</button>
    </div>
  )
}
