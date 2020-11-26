import { useState } from 'react';
import tinycolor from 'tinycolor2';

import Nav from '../components/nav';

const generateContrast = (primary: string) => {
  const primaryTiny = tinycolor(primary);
  const direction = primaryTiny.isDark() ? 'lighten' : 'darken';
  const INCREMENT = 5;
  let contrastTiny = primaryTiny.clone()[direction](INCREMENT);

  while (!tinycolor.isReadable(primaryTiny, contrastTiny, { level: 'AAA', size: 'small' })) {
    contrastTiny = contrastTiny[direction](INCREMENT);
  }

  return contrastTiny.toHex();
};

type Options = {
  nbVariation: number;
  increment: number;
  direction: string;
};

const generatePalette = (color: string, options: Options) => {
  const { nbVariation = 6, increment = 3, direction = 'both' } = options;

  if (direction === 'right') {
    return [
      { name: 'base', color },
      ...Array.from({ length: nbVariation }).map((_, i) => ({
        name: `darken(${(i + 1) * increment})`,
        color: tinycolor(color)
          .darken((i + 1) * increment)
          .toHex(),
      })),
    ];
  }

  if (direction === 'left') {
    return [
      ...Array.from({ length: nbVariation })
        .map((_, i) => ({
          name: `darken(${(i + 1) * increment})`,
          color: tinycolor(color)
            .lighten((i + 1) * increment)
            .toHex(),
        }))
        .reverse(),
      { name: 'base', color },
    ];
  }

  return [
    ...Array.from({ length: Math.floor(nbVariation / 2) })
      .map((_, i) => ({
        name: `darken(${(i + 1) * increment})`,
        color: tinycolor(color)
          .lighten((i + 1) * increment)
          .toHex(),
      }))
      .reverse(),
    { name: 'base', color },
    ...Array.from({ length: Math.floor(nbVariation / 2) }).map((_, i) => ({
      name: `darken(${(i + 1) * increment})`,
      color: tinycolor(color)
        .darken((i + 1) * increment)
        .toHex(),
    })),
  ];
};

const ColorCard = ({ color, name }) => (
  <div className="mx-2 border border-gray-200 rounded overflow-hidden">
    <div className="w-28 h-28" style={{ backgroundColor: `#${color}` }}></div>
    <div className="bg-white px-4 py-2 text-center">
      <div className="text-gray-500">{name}</div>
      <div>
        <span className="text-blue-500">#</span>
        {color}
      </div>
    </div>
  </div>
);

export default function PrimaryPage() {
  const [hexValue, setHexValue] = useState('');
  const [contrast, setContrast] = useState('');

  const onClickGenerate = () => {
    setContrast(generateContrast(hexValue));
  };

  return (
    <div>
      <Nav />
      <div className="py-20">
        <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">First, the greys!</h1>
        <h2 className="text-2xl mt-5 text-center text-gray-500 dark: text-gray-200">
          Give us your base grey level, we will generate the best contrasts.
        </h2>
      </div>
      <div className="flex flex-row justify-center mt-5">
        <div className="mx-2 flex flex-row justify-center overflow-hidden rounded border border-gray-200">
          <label htmlFor="hex" className="flex px-4 py-2 bg-gray-100 text-gray-400 rounder-l">
            #
          </label>
          <input
            className="px-2"
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
