// src/LanguageDetector.js
import React, { useState } from 'react';
import { franc } from 'franc';  
import {iso6393} from 'iso-639-3';

const LanguageDetector = () => {
  const [inputText, setInputText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);

    if (text) {
      const langCode = franc(text);
      const language = iso6393.find(lang => lang.iso6393 === langCode);
      setDetectedLanguage(language ? language.name : 'Unknown');
    } else {
      setDetectedLanguage('');
    }
  };

  return (
    <div className=' flex justify-center items-center'>
      <div className=' py-12'>
      <h1  className=' text-slate-200 font-bold pb-[32px] text-3xl items-center flex justify-center' >Reconnaissance de la langue</h1>
      <textarea
        rows="10"
        className='focus:ring-8 p-4 border-[none] rounded-md'
        cols="50"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type or paste text here..."
        />
        <div className=" bg-slate-400 h-[120px] my-4 ">
        <p className=' translate-x-2 translate-y-[16px] text-[18px] font-bold'>Detected Language: <span className=' text-[16px] text-blue-600'>{detectedLanguage}</span></p>

        </div>
        </div>
    </div>
  );
};

export default LanguageDetector;
