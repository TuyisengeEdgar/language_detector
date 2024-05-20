import React, { useEffect, useRef, useState } from 'react';
import {
  LanguageDetector,
  FilesetResolver
} from '@mediapipe/tasks-text';

import './App.css';

const languageCodeMapping = {
  'ja': 'Japanese',
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'sw':'swahili',
  'zu':'zulu',
  'ss':'Swatti',
  've':'Venda',
  'uk':'Ukrenian',
  'it':'Italian',
  'es':'Spanish',
  'eo':'Esperanto',
  'ar':'Arabic',
  'vi':'Vietnamese',
  'uz':'Uzbek',
  'lkt':'Lakota',
  'haw':'Hawaiian',
  'cy':'Welsh',
  'gd':'Scottish Gaelic',
  'kw':'Cornish',
  'ru':'Russian',
  'xog':'Soga',
  'tr':'Turkish',
  'pt':'Portugaise',
  'rn':'Kirundi',
  'rw':'Rwanda'
  
  // Add more mappings as needed
};

const Language = () => {
  const [languageDetector, setLanguageDetector] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('Result will be shown here...');
  const defaultText =
    "日本語は、日本国内や、かつての日本領だった国、そして国外移民や移住者を含む日本人同士の間で使用されている言語。日本は法令によって公用語を規定していないが、法令その他の公用文は全て日本語で記述され、各種法令において日本語を用いることが規定され、学校教育においては「国語」の教科として学習を行うなど、事実上日本国内において唯一の公用語となっている。";

  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    const createLanguageDetector = async () => {
      const text = await FilesetResolver.forTextTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@0.10.0/wasm"
      );
      const detector = await LanguageDetector.createFromOptions(text, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/language_detector/language_detector/float32/1/language_detector.tflite`
        },
        maxResults: 5
      });
      setLanguageDetector(detector);
    };

    createLanguageDetector();
  }, []);

  const handlePopulateText = () => {
    setInputValue(defaultText);
  };

  const handleSubmit = async () => {
    if (!inputValue) {
      alert("Please write some text, or click 'Populate text' to add text");
      return;
    }

    setOutput("Detecting language...");

    const result = await languageDetector.detect(inputValue);
    displayDetectionResult(result);
  };

  const displayDetectionResult = (result) => {
    if (result.languages.length > 0) {
      const langD = result.languages.map((language) => {
        const languageName = languageCodeMapping[language.languageCode] || `Unknown language code ${language.languageCode}`;
        return `${languageName}: ${language.probability.toFixed(2)}`;
      });
      setOutput(langD.join('\n'));
    } else {
      setOutput('Result is empty');
    }
  };

  return (
    <div className="App flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-teal-600 mb-4">Reconaissance de la langue</h1>
      <h2 className="text-2xl text-gray-700 mb-6">Entre la langue a detecter</h2>
      <div className="w-full max-w-md mb-6">
        <label htmlFor="input" className="block text-gray-500 mb-2">Champ de texte</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 mb-4"
          id="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          ref={inputRef}
        />
      </div>
      <div className="flex space-x-4 mb-6">
        <button
          id="populate-text"
          onClick={handlePopulateText}
          className="bg-teal-500 text-white py-2 px-6 rounded hover:bg-teal-600 transition ease-in-out duration-300 shadow-md"
        >
          Langue populaire
        </button>
        <button
          id="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition ease-in-out duration-300 shadow-md"
        >
          Envoyer
        </button>
      </div>
      <div
        id="output"
        ref={outputRef}
        className="p-4 border border-gray-300 rounded w-full max-w-md bg-white shadow-sm text-gray-700 whitespace-pre-wrap"
      >
        {output}
      </div>
    </div>
  );
};

export default Language;
