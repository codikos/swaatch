import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState, useContext, useEffect } from 'react';
import { isEmpty } from 'lodash/fp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { generateBrand, generatePalette } from '@utils/colors';
import { DispatchContext, StateContext, SET_BRAND_COLOR } from '@utils/state';

import ColorCard from '@components/ColorCard';
import Nav from '@components/Nav';
import { isHighlight } from '@utils/index';

export default function BrandPage() {
  const [brand, setBrand] = useState('');
  const [paletteGenerated, setPaletteGenerated] = useState([]);
  const [error, setError] = useState('');
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const router = useRouter();
  const contentElm = useRef(null);

  const paletteOptions = { direction: 'both', nbVariation: 6, increment: 5 };

  useEffect(() => {
    if (!state.primary && !state.contrast) {
      router.replace('/primary');
    }
    if (state.brand) {
      setBrand(state.brand);
      setPaletteGenerated(generatePalette(state.brand, { ...paletteOptions, name: 'brand' }));
    }
  }, []);

  const scrollToContent = () => contentElm.current.scrollIntoView();

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
      setPaletteGenerated(generatePalette(brandColor, { ...paletteOptions, name: 'brand' }));
      dispatch({ type: SET_BRAND_COLOR, brand: brandColor });
    } catch (error) {
      setError(error.message);
      setBrand(error.brand);
      setPaletteGenerated(generatePalette(error.brand, { ...paletteOptions, name: 'brand' }));
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
          <p className="mt-5">It's time to pick your brand color.</p>
          <p className="mt-5">This should be a vivid color, with a high contrast ratio against your primary color.</p>
          <p className="mt-5">
            If your brand color contrast ratio is not high enough for it to be readable we will calculate the nearest
            readable color in the same hue.
          </p>
          <button className="scroll-btn" onClick={scrollToContent}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div ref={contentElm} className="page-right-container">
          <form
            onSubmit={onClickGenerate}
            className="flex flex-col justify-center w-auto px-4 pt-28 xl:mx-2 2xl:mx-2 2xl:justify-start xl:justify-start xl:px-10 2xl:px-10"
          >
            <h2 className="mt-5 text-center 2xl:text-left xl:text-left">Pick the color:</h2>
            <div className="flex flex-row justify-center mt-3 xl:justify-start 2xl:justify-start">
              <div className="container-input-color">
                <input
                  className="input-color"
                  onChange={(e) => {
                    setError('');
                    setBrand(e.target.value);
                  }}
                  type="color"
                  value={brand}
                  name="hex"
                  id="hex"
                  placeholder="bada55"
                />
              </div>
              <button type="submit" disabled={!brand} className="btn-blue">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </form>
          {error && (
            <div className="container mx-auto">
              <div className="px-20 py-10 mt-10 font-bold text-center text-white bg-yellow-600 rounded">{error}</div>
            </div>
          )}
          {!isEmpty(paletteGenerated) && (
            <div className="px-4 py-4 xl:px-10 2xl:px-10">
              <div className="mt-10">
                <h3 className="mx-2 mb-5 text-3xl font-bold">Brand:</h3>
                <div className="flex flex-col justify-between mt-1 xl:flex-row 2xl:flex-row">
                  {paletteGenerated.map(({ name, color }) => (
                    <ColorCard key={name} color={color} name={name} highlight={isHighlight(name)} />
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <h3 className="mx-2 mb-5 text-3xl font-bold">Primary:</h3>
                <div className="flex flex-col justify-between mt-1 xl:flex-row 2xl:flex-row">
                  {generatePalette(state.primary, { ...paletteOptions, name: 'primary' }).map(({ name, color }) => (
                    <ColorCard key={name} color={color} name={name} highlight={isHighlight(name)} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {!isEmpty(paletteGenerated) && (
            <div className="flex flex-col p-10 mt-20 bg-gray-200 dark:bg-gray-700 place-content-center">
              <p className="text-xl text-center">
                If you are satisfied with those, we can go on to chose your state colors.
              </p>
              <div className="flex mt-10 place-content-center">
                <Link href="/states">
                  <a className="btn-blue">
                    <FontAwesomeIcon icon={faArrowRight} /> Go
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
