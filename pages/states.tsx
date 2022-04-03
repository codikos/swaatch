import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useContext, useState, useRef } from 'react';
import tinycolor from 'tinycolor2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle as farCheckCircle } from '@fortawesome/free-regular-svg-icons';

import { Color, generatePalette, generateStateColor } from '@utils/colors';
import { DispatchContext, SET_STATE_COLORS, StateContext } from '@utils/state';

import Nav from '@components/Nav';
import ColorCard from '@components/ColorCard';
import { isHighlight } from '@utils/index';
import Links from '@components/Links';

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
      success: generateStateColor('success', saturation, luminosity),
      info: generateStateColor('info', saturation, luminosity),
      warning: generateStateColor('warning', saturation, luminosity),
      error: generateStateColor('error', saturation, luminosity),
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
          content="You can now select all the state colors your application needs and adjust them. State colors are generally used to indicate success, informations, warnings or failures. Most of the times they are in shades of green, blue, orange and red respectively. They are usually used as a background for UI components."
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
            <strong className="underline decoration-green-600 decoration-4">green</strong>, <strong className="underline decoration-blue-600 decoration-4">blue</strong>,{' '}
            <strong className="underline decoration-yellow-600 decoration-4">orange</strong> and <strong className="underline decoration-red-600 decoration-4">red</strong>{' '}
            respectively.
          </p>
          <p className="mt-5">
            Those colors would usually be used as a <strong>background</strong> for <strong>UI components</strong> like
            buttons, badges, notifications, snackbars, etc...
          </p>
          <button className="scroll-btn" onClick={scrollToContent}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div ref={contentElm} className="page-right-container">
          <div className="flex flex-col justify-center w-auto px-4 pt-28 xl:mx-2 xl:justify-start xl:px-10">
            {Object.values(displayedStates)
              .map(Boolean)
              .includes(true) && (
              <div className="mt-10">
                <h3 className=" text-3xl font-bold">State colors</h3>
                <div className="flex flex-col mt-2">
                  {Object.entries(displayedStates)
                    .filter(([, color]) => Boolean(color))
                    .map(([state, color]) => (
                      <Fragment key={`${state}-${color}`}>
                        <h3 className=" mt-5 text-2xl font-bold capitalize">
                          <label className="">
                            <span className={`mr-2 ${selectedStates[state] ? 'text-blue-500' : ''}`}>
                              <FontAwesomeIcon icon={selectedStates[state] ? faCheckCircle : farCheckCircle} />
                            </span>
                            <input
                              onChange={() => toggleSelectState(state)}
                              className="hidden"
                              type="checkbox"
                              checked={selectedStates[state]}
                              value={selectedStates[state]}
                            />
                            {state}
                          </label>
                        </h3>
                        <div className="flex flex-col justify-center mt-2 xl:flex-row xl:space-x-2">
                          {generatePalette(color, {
                            direction: 'both',
                            nbVariation: 6,
                            increment: 5,
                            name: state,
                            colorToCompare: 'white',
                          }).map(({ name, color, contrastScore }: Color) => (
                            <ColorCard
                              key={`${name}-${color}`}
                              color={color}
                              name={name}
                              contrastScore={contrastScore}
                              highlight={isHighlight(name)}
                            />
                          ))}
                        </div>
                      </Fragment>
                    ))}
                </div>
              </div>
            )}
            <div className="mt-10">
              <h3 className=" text-3xl font-bold">Reminder</h3>
              <div className="flex flex-col justify-between mt-1 xl:flex-row xl:space-x-2">
                <ColorCard color={state.primary} name="Primary" />
                <ColorCard color={state.contrast} name="Contrast" />
                <ColorCard color={state.brand} name="Brand" />
              </div>
            </div>
          </div>
          <div className="flex flex-col p-10 mt-20 bg-gray-200 dark:bg-gray-700 place-content-center">
            <p className="text-xl text-center">
              If you like what you&apos;re seeing, let&apos;s go see what your palette looks like.
            </p>
            <div className="flex mt-10 place-content-center">
              <Link href="/recap">
                <a className="btn-blue">
                  <FontAwesomeIcon icon={faArrowRight} /> Go
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Links />
    </div>
  );
}
