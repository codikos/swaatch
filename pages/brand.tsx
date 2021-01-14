import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import { isEmpty } from 'lodash/fp';

import { generateBrand, generatePalette } from '@utils/colors';
import { DispatchContext, StateContext, SET_BRAND_COLOR } from '@utils/state';

import ColorCard from '@components/ColorCard';
import Nav from '@components/Nav';

export default function BrandPage() {
  const [brand, setBrand] = useState('');
  const [paletteGenerated, setPaletteGenerated] = useState([]);
  const [error, setError] = useState('');
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const router = useRouter();

  useEffect(() => {
    if (!state.primary && !state.contrast) {
      router.replace('/primary');
    }
    if (state.brand) {
      setBrand(state.brand);
      setPaletteGenerated(generatePalette(state.brand, { direction: 'both', nbVariation: 6, increment: 5 }));
    }
  }, []);

  const onClickGenerate = (e) => {
    e.preventDefault();
    setError('');
    setPaletteGenerated([]);

    try {
      if (!brand) {
        setError('You must provide us with the brand color');
        return;
      }
      const brandColor = generateBrand(brand, state.primary);
      setBrand(brandColor);
      setPaletteGenerated(generatePalette(brandColor, { direction: 'both', nbVariation: 6, increment: 5 }));
      dispatch({ type: SET_BRAND_COLOR, brand: brandColor });
    } catch (error) {
      setError(error.message);
      setBrand(error.brand);
      dispatch({ type: SET_BRAND_COLOR, brand: error.brand });
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
      <div className="page-container">
        <div className="page-left-container">
          <h1 className="page-title from-blue-900 to-green-500 dark:from-blue-500 dark:to-green-400">
            Now the color of your brand!
          </h1>
          <h2 className="mt-5">This should be a vivid color, with a high contrast against your primary color.</h2>
        </div>
        <div className="page-right-container">
          <form onSubmit={onClickGenerate}>
            <div className="flex flex-row justify-center mt-5">
              <div className="container-input-color">
                <label htmlFor="hex" className="label-input-color">
                  #
                </label>
                <input
                  className="input-color"
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
          {!isEmpty(paletteGenerated) && (
            <>
              <div className="mt-10">
                <h3 className="mx-2 mb-5 text-3xl font-bold">Brand:</h3>
                <div className="flex flex-row justify-between mt-1">
                  {paletteGenerated.map(({ name, color }) => (
                    <ColorCard key={color} color={color} name={name} />
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <h3 className="mx-2 mb-5 text-3xl font-bold">Primary:</h3>
                <div className="flex flex-row justify-between mt-1">
                  {generatePalette(state.primary, { direction: 'both', nbVariation: 6, increment: 5 }).map(
                    ({ name, color }) => (
                      <ColorCard key={color} color={color} name={name} />
                    ),
                  )}
                </div>
              </div>
              <div className="flex flex-col mt-20 place-content-center">
                <p className="text-2xl text-center">
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
    </div>
  );
}
