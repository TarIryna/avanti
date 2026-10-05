'use client';

import React from 'react';
import { Iframe, Wrapper } from './styles';

// Функция для извлечения ID видео из любой ссылки YouTube
function getYoutubeId(url) {
  if (!url) return null;
  
  // Добавили подстроку (shorts\/) в регулярное выражение
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  // Возвращаем чистый 11-значный ID видео
  return (match && match[2].length === 11) ? match[2] : null;
}


export default function YoutubePlayer({ url }) {
  const videoId = getYoutubeId(url);
  const src = `https://www.youtube.com/embed/${videoId}`;

  if (!videoId) {
    return (
      <div className="w-full pt-[56.25%] bg-gray-800 rounded-lg flex items-center justify-center text-white">
        Некоректна ссилка на відео
      </div>
    );
  }

  return (
    <Wrapper>
      <Iframe
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </Wrapper>
  );
}
