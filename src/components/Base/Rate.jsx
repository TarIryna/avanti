"use client";
import {useState } from 'react';
import * as S from '../Shop/styles'
import toast from 'react-hot-toast';


const RatePage = () => {
   const [rate, setRate] = useState(null)

 const onSetRate = async() => {
  if (!rate){
    return
  }
  try {
    const res = await fetch('/api/rate', { 
        method: 'POST', // Переключаем на POST
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({rate}) 
      });
     const result = await res.json();
     if (result.success){
      toast.success(`Задано курс ${result.rate ?? ''}`)
     }
  } catch (e) {
    console.log(e)
  }
 }



    return (
      <section className="container page">
        <S.Title>КУРС ДОЛАРА</S.Title>
            <S.Input     
              type="number"
              placeholder="Курс долара"
              tabIndex={20}
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              />
 
            <S.CheckButton onClick={onSetRate}>Задати курс</S.CheckButton>
      
      </section>
    )
}

export default RatePage