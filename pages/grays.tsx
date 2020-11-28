import { useState } from 'react';

import Nav from '../components/nav';
import ColorCard from '../components/ColorCard';

import { generateContrast, generatePalette } from '../utils';

export default function PrimaryPage() {
  const [hexValue, setHexValue] = useState('');
  const [contrast, setContrast] = useState('');

  const onClickGenerate = () => {
    setContrast(generateContrast(hexValue));
  };

  return (
    <div>
      <Nav />
      <div className="py-10">
        <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">First, the primary color!</h1>
        <h2 className="text-2xl mt-5 text-center text-gray-500 dark: text-gray-200">
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
            className="px-2 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-100"
            onChange={(e) => {
              setContrast('');
              setHexValue(e.target.value);
            }}
            type="text"
            name="hex"
            id="hex"
            placeholder="bada55"
          />
        </div>
        <button onClick={onClickGenerate} className="btn-blue">
          Generate contrast
        </button>
      </div>
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
