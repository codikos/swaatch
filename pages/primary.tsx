import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';

import Nav from '@components/Nav';
import ColorCard from '@components/ColorCard';

import { generateContrast, generatePalette } from '@utils/colors';
import { DispatchContext, SET_CONTRAST_COLOR, SET_PRIMARY_COLOR, StateContext } from '@utils/state';
import { isHighlight } from '@utils/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Links from '@components/Links';

export default function PrimaryPage() {
  const state = useContext(StateContext);
  const [hexValue, setHexValue] = useState('');
  const [hexPalette, setHexPalette] = useState([]);
  const [contrast, setContrast] = useState('');
  const [contrastPalette, setContrastPalette] = useState([]);
  const [error, setError] = useState('');
  const dispatch = useContext(DispatchContext);
  const contentElm = useRef(null);

  const paletteOptions = { direction: 'both', nbVariation: 6, increment: 5 };

  useEffect(() => {
    if (state.primary) {
      setHexValue(state.primary);
      setHexPalette(generatePalette(state.primary, { ...paletteOptions, name: 'primary' }));

      if (state.contrast) {
        setContrast(state.contrast);
        setContrastPalette(generatePalette(state.contrast, { ...paletteOptions, name: 'contrast' }));
      } else {
        const initContrast = generateContrast(state.primary);
        setContrast(initContrast);
        setContrastPalette(generatePalette(initContrast, { ...paletteOptions, name: 'contrast' }));
      }
    }
  }, []);

  const onClickGenerate = (e: any) => {
    e.preventDefault();
    setError('');
    try {
      if (!hexValue) {
        setError('You must provide us with the primary color');
        return;
      }
      setHexPalette(generatePalette(hexValue, { ...paletteOptions, name: 'primary' }));
      const contrast = generateContrast(hexValue);
      setContrast(contrast);
      setContrastPalette(generatePalette(contrast, { ...paletteOptions, name: 'contrast' }));
      dispatch({ type: SET_PRIMARY_COLOR, primary: hexValue });
      dispatch({ type: SET_CONTRAST_COLOR, contrast: contrast });
    } catch (error) {
      setError(error);
    }
  };

  const scrollToContent = () => contentElm.current.scrollIntoView();

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
      <div className="page-container">
        <div className="page-left-container">
          <h1 className="page-title from-gray-900 to-gray-500 dark:from-gray-500 dark:to-gray-100">
            First, the primary color!
          </h1>
          <p className="mt-5">
            The primary color is generally used for the background or the main text color of your application.
          </p>
          <p className="mt-5">
            It should either be a really dark or really light color,{' '}
            <strong>meaning a really high or really low lightness level</strong>.
          </p>
          <p className="mt-5">
            It should also lean towards the grayish colors, <strong>which means a really low saturation level</strong>.
          </p>
          <p className="mt-5">We will generate the best contrast for that color and then create some variants.</p>
          <button className="scroll-btn" onClick={scrollToContent}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div className="page-right-container" ref={contentElm}>
          <form
            onSubmit={onClickGenerate}
            className="flex flex-col justify-center w-auto px-4 pt-28 xl:mx-2 2xl:mx-2 2xl:justify-start xl:justify-start xl:px-10 2xl:px-10"
          >
            <h2 className="mt-5 text-center xl:text-left 2xl:text-left">Pick the color:</h2>
            <div className="flex flex-row justify-center mt-3 xl:justify-start 2xl:justify-start">
              <div className="container-input-color">
                <input
                  className="input-color"
                  onChange={(e) => {
                    setError('');
                    setContrast('');
                    setHexValue(e.target.value);
                  }}
                  value={hexValue}
                  type="color"
                  name="hex"
                  id="hex"
                  placeholder="#404040"
                />
              </div>
              <button type="submit" disabled={!hexValue} className="btn-blue">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </form>
          {error && (
            <div className="container mx-auto">
              <div className="px-20 py-10 mt-10 font-bold text-center text-white bg-yellow-600 rounded">{error}</div>
            </div>
          )}
          {contrast && (
            <div className="px-4 py-4 xl:px-10 2xl:px-10">
              <div className="mt-10">
                <h3 className="mx-2 text-3xl font-bold">Primary:</h3>
                <div className="flex flex-col justify-between mt-1 xl:flex-row 2xl:flex-row">
                  {hexPalette.map(({ name, color }) => (
                    <ColorCard key={name} color={color} name={name} highlight={isHighlight(name)} />
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <h3 className="mx-2 text-3xl font-bold">Contrast:</h3>
                <div className="flex flex-col justify-between mt-1 xl:flex-row 2xl:flex-row">
                  {contrastPalette.map(({ name, color }) => (
                    <ColorCard key={name} color={color} name={name} highlight={isHighlight(name)} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {contrast && (
            <div className="flex flex-col p-10 mt-20 bg-gray-200 dark:bg-gray-700 place-content-center">
              <p className="text-xl text-center">
                If you are satisfied, we can go on to the next step, which is to choose your brand color.
              </p>
              <div className="flex mt-10 place-content-center">
                <Link href="/brand">
                  <a className="btn-blue">
                    <FontAwesomeIcon icon={faArrowRight} /> Go
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Links />
    </div>
  );
}
