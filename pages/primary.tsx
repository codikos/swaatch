import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';

import Nav from '@components/Nav';
import ColorCard from '@components/ColorCard';

import { generateContrast, generatePalette } from '@utils/colors';
import { DispatchContext, SET_CONTRAST_COLOR, SET_PRIMARY_COLOR, StateContext } from '@utils/state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

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
      setHexPalette(generatePalette(state.primary, paletteOptions));

      if (state.contrast) {
        setContrast(state.contrast);
        setContrastPalette(generatePalette(state.contrast, paletteOptions));
      } else {
        const initContrast = generateContrast(state.primary);
        setContrast(initContrast);
        setContrastPalette(generatePalette(initContrast, paletteOptions));
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
      setHexPalette(generatePalette(hexValue, paletteOptions));
      const contrast = generateContrast(hexValue);
      setContrast(contrast);
      setContrastPalette(generatePalette(contrast, paletteOptions));
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
                <h3 className="mx-2 text-3xl font-bold">Primary:</h3>
                <div className="flex flex-col justify-between mt-1 xl:flex-row 2xl:flex-row">
                  {hexPalette.map(({ name, color }) => (
                    <ColorCard key={color} color={color} name={name} />
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <h3 className="mx-2 text-3xl font-bold">Contrast:</h3>
                <div className="flex flex-col justify-between mt-1 xl:flex-row 2xl:flex-row">
                  {contrastPalette.map(({ name, color }) => (
                    <ColorCard key={color} color={color} name={name} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col mt-20 place-content-center">
                <p className="text-2xl text-center">
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
    </div>
  );
}
