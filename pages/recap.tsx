import Head from 'next/head';
import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import Nav from '@components/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { StateContext } from '@utils/state';
import { generatePalette } from '@utils/colors';
import ColorCard from '@components/ColorCard';

export default function RecapPage() {
  const contentElm = useRef(null);
  const state = useContext(StateContext);
  const [primary, setPrimary] = useState('');
  const [contrast, setContrast] = useState('');
  const [brand, setBrand] = useState('');
  const [success, setSuccess] = useState('');
  const [info, setInfo] = useState('');
  const [warning, setWarning] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!state.primary && !state.contrast) {
      router.replace('/primary');
    }
    setPrimary(state.primary);
    setContrast(state.contrast);
    setBrand(state.brand);
    setSuccess(state.states.success);
    setInfo(state.states.info);
    setWarning(state.states.warning);
    setError(state.states.error);
  }, []);

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
          <h1 className="page-title from-pink-500 to-yellow-500">Let's see your palette now!</h1>
          <button className="scroll-btn" onClick={scrollToContent}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div className="page-right-container" ref={contentElm}>
          <div className="flex flex-col justify-center mt-2 xl:flex-row 2xl:flex-row">
            {generatePalette(primary, { direction: 'both', nbVariation: 6, increment: 5, name: 'primary' }).map(
              ({ name, color }) => (
                <ColorCard name={name} color={color} />
              ),
            )}
          </div>
          <div className="flex flex-col justify-center mt-2 xl:flex-row 2xl:flex-row">
            {generatePalette(contrast, { direction: 'both', nbVariation: 6, increment: 5, name: 'primary' }).map(
              ({ name, color }) => (
                <ColorCard name={name} color={color} />
              ),
            )}
          </div>
          <div className="flex flex-col justify-center mt-2 xl:flex-row 2xl:flex-row">
            {generatePalette(brand, { direction: 'both', nbVariation: 6, increment: 5, name: 'primary' }).map(
              ({ name, color }) => (
                <ColorCard name={name} color={color} />
              ),
            )}
          </div>
          <div className="flex flex-col justify-center mt-2 xl:flex-row 2xl:flex-row">
            {generatePalette(success, { direction: 'both', nbVariation: 6, increment: 5, name: 'primary' }).map(
              ({ name, color }) => (
                <ColorCard name={name} color={color} />
              ),
            )}
          </div>
          <div className="flex flex-col justify-center mt-2 xl:flex-row 2xl:flex-row">
            {generatePalette(info, { direction: 'both', nbVariation: 6, increment: 5, name: 'primary' }).map(
              ({ name, color }) => (
                <ColorCard name={name} color={color} />
              ),
            )}
          </div>
          <div className="flex flex-col justify-center mt-2 xl:flex-row 2xl:flex-row">
            {generatePalette(warning, { direction: 'both', nbVariation: 6, increment: 5, name: 'primary' }).map(
              ({ name, color }) => (
                <ColorCard name={name} color={color} />
              ),
            )}
          </div>
          <div className="flex flex-col justify-center mt-2 xl:flex-row 2xl:flex-row">
            {generatePalette(error, { direction: 'both', nbVariation: 6, increment: 5, name: 'primary' }).map(
              ({ name, color }) => (
                <ColorCard name={name} color={color} />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
