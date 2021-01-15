import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useContext, useState, useRef } from 'react';
import tinycolor from 'tinycolor2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle as farCheckCircle } from '@fortawesome/free-regular-svg-icons';

import { generatePalette, generateStateColor } from '@utils/colors';
import { DispatchContext, SET_STATE_COLORS, StateContext } from '@utils/state';

import Nav from '@components/Nav';
import ColorCard from '@components/ColorCard';

const SUCCESS_RANGE = [90, 150];
const INFO_RANGE = [210, 270];
const WARNING_RANGE = [0, 60];
const ERROR_RANGE = [-30, 30];

export default function StatesPage() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [displayedStates, setDisplayedState] = useState({
    success: null,
    info: null,
    warning: null,
    error: null,
  });
  const [selectedStates, setSelectedStates] = useState({
    success: true,
    info: true,
    warning: true,
    error: true,
  });
  const router = useRouter();
  const contentElm = useRef(null);

  useEffect(() => {
    if (!state.primary && !state.contrast) {
      router.replace('/primary');
    }
    const brandTiny = tinycolor(state.brand);
    const brandHSL = brandTiny.toHsl();
    const saturation = Math.floor(brandHSL.s * 100);
    const luminosity = Math.floor(brandHSL.l * 100);
    const states = {
      success: generateStateColor(SUCCESS_RANGE, saturation, luminosity),
      info: generateStateColor(INFO_RANGE, saturation, luminosity),
      warning: generateStateColor(WARNING_RANGE, saturation, luminosity),
      error: generateStateColor(ERROR_RANGE, saturation, luminosity),
    };

    setDisplayedState(states);

    dispatch({ type: SET_STATE_COLORS, states });
  }, []);

  const scrollToContent = () => contentElm.current.scrollIntoView();

  const toggleSelectState = (stateToToggle: string) => {
    dispatch({
      type: SET_STATE_COLORS,
      states: { ...state.states, [stateToToggle]: selectedStates[stateToToggle] ? '' : displayedStates[stateToToggle] },
    });
    setSelectedStates((previousStates) => ({
      ...previousStates,
      [stateToToggle]: !previousStates[stateToToggle],
    }));
  };

  return (
    <div>
      <Head>
        <title>Swaatch - Time to set your application state colors.</title>
        <meta
          name="description"
          content="You can now select all the state colors your application needs and adjust them."
        />
      </Head>
      <Nav />
      <div className="page-container">
        <div className="page-left-container">
          <h1 className="page-title from-purple-500 to-red-500 dark:from-purple-400 dark:to-red-400">
            Time to select your application state colors!
          </h1>
          <p className="mt-5">
            The state colors are used to indicate <strong>success</strong>, <strong>informations</strong>,{' '}
            <strong>warnings</strong> or <strong>failures</strong> and they are usually shades of{' '}
            <strong className="text-green-600">green</strong>, <strong className="text-blue-600">blue</strong>,{' '}
            <strong className="text-yellow-600">orange</strong> and <strong className="text-red-600">red</strong>{' '}
            respectively.
          </p>
          <button className="scroll-btn" onClick={scrollToContent}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div ref={contentElm} className="page-right-container">
          {Object.values(displayedStates)
            .map(Boolean)
            .includes(true) && (
            <div className="mt-10">
              <h3 className="mx-2 text-3xl font-bold">State colors</h3>
              <div className="flex flex-col mt-2">
                {Object.entries(displayedStates)
                  .filter(([_, color]) => Boolean(color))
                  .map(([state, color]) => (
                    <Fragment key={color}>
                      <h3 className="mx-2 mt-5 text-2xl font-bold capitalize">
                        <label className="">
                          <span className={`mr-2 ${selectedStates[state] ? 'text-blue-500' : ''}`}>
                            <FontAwesomeIcon icon={selectedStates[state] ? faCheckCircle : farCheckCircle} />
                          </span>
                          <input
                            onClick={() => toggleSelectState(state)}
                            className="hidden"
                            type="checkbox"
                            checked={selectedStates[state]}
                            value={selectedStates[state]}
                          />
                          {state}
                        </label>
                      </h3>
                      <div key={state} className="flex flex-row justify-center mt-2">
                        {generatePalette(color, { direction: 'both', nbVariation: 6, increment: 5 }).map(
                          ({ name, color }) => (
                            <ColorCard key={name} color={color} name={name} />
                          ),
                        )}
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
          )}
          <div className="mt-10">
            <h3 className="mx-2 text-3xl font-bold">Reminder</h3>
            <div className="flex flex-row justify-between mt-1">
              <ColorCard color={state.primary} name="Primary" />
              <ColorCard color={state.contrast} name="Contrast" />
              <ColorCard color={state.brand} name="Brand" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
