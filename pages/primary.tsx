import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import Nav from '@components/Nav';
import ColorCard from '@components/ColorCard';

import { generateContrast, generatePalette } from '@utils/colors';
import { DispatchContext, SET_CONTRAST_COLOR, SET_PRIMARY_COLOR, StateContext } from '@utils/state';

export default function PrimaryPage() {
  const state = useContext(StateContext);
  const [hexValue, setHexValue] = useState('');
  const [contrast, setContrast] = useState('');
  const [error, setError] = useState('');
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    setHexValue(state.primary);
  }, []);

  const onClickGenerate = (e) => {
    e.preventDefault();
    setError('');
    try {
      if (!hexValue) {
        setError('You must provide us with the primary color');
        return;
      }
      const contrast = generateContrast(hexValue);
      setContrast(contrast);
      dispatch({ type: SET_PRIMARY_COLOR, primary: hexValue });
      dispatch({ type: SET_CONTRAST_COLOR, contrast: contrast });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Swaatch - Start with the primary color.</title>
        <meta
          name="description"
          content="Start by giving us the primary color of your design, Swaatch will automatically calculate the best readable contrast according to WCAG recommendations."
        />
      </Head>
      <Nav />
      <div className="container p-10 mx-auto">
        <div className="py-5">
          <h1 className="page-title from-gray-900 to-gray-500">First, the primary color!</h1>
          <h2 className="mt-5 text-xl text-center text-gray-200 text-gray-600">
            It should be either a really dark or really light color, leaning towards the grays
          </h2>
          <h2 className="mt-2 text-xl text-center text-gray-200 text-gray-600">
            We will generate the best contrast for that color and then create some variants.
          </h2>
        </div>
        <form onSubmit={onClickGenerate}>
          <div className="flex flex-row justify-center mt-5">
            <div className="flex flex-row justify-center mx-2 overflow-hidden border border-gray-200 rounded">
              <label htmlFor="hex" className="flex px-4 py-2 text-gray-400 bg-gray-100 rounder-l">
                #
              </label>
              <input
                className="px-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onChange={(e) => {
                  setError('');
                  setContrast('');
                  setHexValue(`#${e.target.value}`);
                }}
                type="text"
                name="hex"
                id="hex"
                placeholder="404040"
              />
            </div>
            <button type="submit" disabled={!hexValue} className="btn-blue">
              Generate contrast
            </button>
          </div>
        </form>
        {error && (
          <div className="container mx-auto">
            <div className="px-20 py-10 mt-10 font-bold text-center text-white bg-yellow-600 rounded">{error}</div>
          </div>
        )}
        {contrast && (
          <>
            <div className="mt-20">
              <h3 className="mx-2 text-3xl font-bold text-gray-700">Primary:</h3>
              <div className="flex flex-row justify-between mt-1">
                {generatePalette(hexValue, { direction: 'both', nbVariation: 6, increment: 5 }).map(
                  ({ name, color }) => (
                    <ColorCard key={color} color={color} name={name} />
                  ),
                )}
              </div>
            </div>
            <div className="mt-10">
              <h3 className="mx-2 text-3xl font-bold text-gray-700">Contrast:</h3>
              <div className="flex flex-row justify-between mt-1">
                {generatePalette(contrast, { direction: 'both', nbVariation: 6, increment: 5 }).map(
                  ({ name, color }) => (
                    <ColorCard key={color} color={color} name={name} />
                  ),
                )}
              </div>
            </div>
            <div className="flex flex-col mt-20 place-content-center">
              <p className="text-2xl text-center text-gray-500">
                If you are satisfied with those, we can go on to chose your brand color
              </p>
              <div className="flex mt-10 place-content-center">
                <Link href="/brand">
                  <a className="btn-blue">Choose your brand color</a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
