import { useState } from 'react';

import Nav from '../components/nav';
import ColorCard from '../components/ColorCard';

import { generateContrast, generatePalette } from '../utils';

export default function PrimaryPage() {
  const [hexValue, setHexValue] = useState('');
  const [contrast, setContrast] = useState('');
  const [error, setError] = useState('');

  const onClickGenerate = () => {
    setError('');
    try {
      if (!hexValue) {
        setError('You must provide us with the primary color');
        return;
      }
      const contrast = generateContrast(hexValue);
      setContrast(contrast);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <Nav />
      <div className="py-5">
        <h1 className="text-4xl text-center text-gray-700 dark:text-gray-100">First, the primary color!</h1>
        <h2 className="text-xl mt-5 text-center text-gray-500 dark: text-gray-200">
          It should be either a really dark or really light color, we will generate the best contrast for that color and
          then create some variants.
        </h2>
      </div>
      <div className="flex flex-row justify-center mt-5">
        <div className="mx-2 flex flex-row justify-center overflow-hidden rounded border border-gray-200 dark:border-gray-600">
          <label htmlFor="hex" className="flex px-4 py-2 bg-gray-100 text-gray-400 dark:bg-gray-700 rounder-l">
            #
          </label>
          <input
            className="px-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onChange={(e) => {
              setError('');
              setContrast('');
              setHexValue(e.target.value);
            }}
            type="text"
            name="hex"
            id="hex"
            placeholder="bada55"
          />
        </div>
        <button onClick={onClickGenerate} disabled={!hexValue} className="btn-blue">
          Generate contrast
        </button>
      </div>
      {error && (
        <div className="container mx-auto">
          <div className="bg-yellow-600 rounded text-center font-bold mt-10 py-10 px-20 text-white">{error}</div>
        </div>
      )}
      {contrast && (
        <>
          <div className="mt-5">
            <h3 className="text-1xl text-center font-bold text-gray-700 dark:text-gray-100">Primary</h3>
            <div className="flex flex-row justify-center mt-1">
              {generatePalette(hexValue, { direction: 'both', nbVariation: 6, increment: 3 }).map(({ name, color }) => (
                <ColorCard color={color} name={name} />
              ))}
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-1xl text-center font-bold text-gray-700 dark:text-gray-100">Contrast</h3>
            <div className="flex flex-row justify-center mt-1">
              {generatePalette(contrast, { direction: 'both', nbVariation: 6, increment: 3 }).map(({ name, color }) => (
                <ColorCard color={color} name={name} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
