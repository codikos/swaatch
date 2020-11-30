import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import { DispatchContext, generateBrand, generatePalette, SET_BRAND_COLOR, StateContext } from '../utils';
import ColorCard from '../components/ColorCard';

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
    setBrand(state.brand.replace('#', ''));
    if (state.brand) {
      setPaletteGenerated(true);
    }
  }, []);

  const onClickGenerate = () => {
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
      <div className="py-5">
        <h1 className="text-4xl text-center text-gray-800 dark:text-gray-100">Now the color of your brand!</h1>
        <h2 className="text-xl mt-5 text-center text-gray-600 dark: text-gray-200">
          This should be a vivid color, with a high contrast against your primary color.
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
              setBrand(e.target.value);
            }}
            type="text"
            name="hex"
            id="hex"
            placeholder="bada55"
          />
        </div>
        <button onClick={onClickGenerate} disabled={!brand} className="btn-blue">
          Generate brand palette
        </button>
      </div>
      {error && (
        <div className="container mx-auto">
          <div className="bg-yellow-600 rounded text-center font-bold mt-10 py-10 px-20 text-white">{error}</div>
        </div>
      )}
      {paletteGenerated && (
        <>
          <div className="mt-5">
            <h3 className="text-1xl text-center font-bold text-gray-700 dark:text-gray-100">Brand</h3>
            <div className="flex flex-row justify-center mt-1">
              {generatePalette(brand, { direction: 'both', nbVariation: 6, increment: 3 }).map(({ name, color }) => (
                <ColorCard color={color} name={name} />
              ))}
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-1xl text-center font-bold text-gray-700 dark:text-gray-100">Primary</h3>
            <div className="flex flex-row justify-center mt-1">
              {generatePalette(state.primary.replace('#', ''), { direction: 'both', nbVariation: 6, increment: 3 }).map(
                ({ name, color }) => (
                  <ColorCard color={color} name={name} />
                ),
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
