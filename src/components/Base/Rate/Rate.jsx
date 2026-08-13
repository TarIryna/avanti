"use client";
import * as S from './styles'
import RateForm from './RateForm';


const RatePage = () => {
    return (
      <section className="container page">
        <S.Title>КУРСЫ ВАЛЮТ</S.Title>
        <RateForm/>
      </section>
    )
}

export default RatePage