import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';

import { generateBrand, generatePalette } from '@utils/colors';
import { DispatchContext, StateContext, SET_BRAND_COLOR } from '@utils/state';

import ColorCard from '@components/ColorCard';
import Nav from '@components/Nav';

export default function BrandPage() {
  const [brand, setBrand] = useState('');
  const [paletteGenerated, setPaletteGenerated] = useState(false);
  const [error, setError] = useState('');
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const router = useRouter();

  useEffect(() => {
    if (!state.primary && !state.contrast) {
      router.replace('/primary');
    }
    setBrand(state.brand);
    if (state.brand) {
      setPaletteGenerated(true);
    }
  }, []);

  const onClickGenerate = (e) => {
    e.preventDefault();
    setError('');
    setPaletteGenerated(false);

    try {
      if (!brand) {
        setError('You must provide us with the brand color');
        return;
      }
      const brandColor = generateBrand(brand, state.primary);
      setBrand(brandColor);
      dispatch({ type: SET_BRAND_COLOR, brand: brandColor });
    } catch (error) {
      setError(error.message);
      setBrand(error.brand);
      dispatch({ type: SET_BRAND_COLOR, brand: error.brand });
    } finally {
      setPaletteGenerated(true);
    }
  };

  return (
    <div>
      <Head>
        <title>Swaatch - Now choose your brand color.</title>
        <meta
          name="description"
          content="You can now choose the color of your brand, we will also generate some variations."
        />
      </Head>
      <Nav />
      <div className="container p-10 mx-auto">
        <div className="py-5">
          <h1 className="page-title from-blue-900 to-green-500">Now the color of your brand!</h1>
          <h2 className="mt-5 text-xl text-center text-gray-200 text-gray-600">
            This should be a vivid color, with a high contrast against your primary color.
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
                  setBrand(`#${e.target.value}`);
                }}
                type="text"
                name="hex"
                id="hex"
                placeholder="bada55"
              />
            </div>
            <button type="submit" disabled={!brand} className="btn-blue">
              Generate brand palette
            </button>
          </div>
        </form>
        {error && (
          <div className="container mx-auto">
            <div className="px-20 py-10 mt-10 font-bold text-center text-white bg-yellow-600 rounded">{error}</div>
          </div>
        )}
        {paletteGenerated && (
          <>
            <div className="mt-10">
              <h3 className="mx-2 mb-5 text-3xl font-bold text-gray-700">Brand:</h3>
              <div className="flex flex-row justify-between mt-1">
                {generatePalette(brand, { direction: 'both', nbVariation: 6, increment: 5 }).map(({ name, color }) => (
                  <ColorCard key={color} color={color} name={name} />
                ))}
              </div>
            </div>
            <div className="mt-10">
              <h3 className="mx-2 mb-5 text-3xl font-bold text-gray-700">Primary:</h3>
              <div className="flex flex-row justify-between mt-1">
                {generatePalette(state.primary, { direction: 'both', nbVariation: 6, increment: 5 }).map(
                  ({ name, color }) => (
                    <ColorCard key={color} color={color} name={name} />
                  ),
                )}
              </div>
            </div>
            <div className="flex flex-col mt-20 place-content-center">
              <p className="text-2xl text-center text-gray-500">
                If you are satisfied with those, we can go on to chose your state colors
              </p>
              <div className="flex mt-10 place-content-center">
                <Link href="/states">
                  <a className="btn-blue">Choose your state colors</a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
