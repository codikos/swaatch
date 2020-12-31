import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useContext, useState } from 'react';
import tinycolor from 'tinycolor2';

import { generatePalette, generateStateColor } from '@utils/colors';
import { StateContext } from '@utils/state';

import Nav from '@components/Nav';
import ColorCard from '@components/ColorCard';

const SUCCESS_RANGE = [90, 150];
const INFO_RANGE = [210, 270];
const WARNING_RANGE = [0, 60];
const ERROR_RANGE = [-30, 30];

export default function StatesPage() {
  const state = useContext(StateContext);
  const [displayedStates, setDisplayedState] = useState({
    success: null,
    info: null,
    warning: null,
    error: null,
  });
  const router = useRouter();

  useEffect(() => {
    if (!state.primary && !state.contrast) {
      router.replace('/primary');
    }
    const brandTiny = tinycolor(state.brand);
    const brandHSL = brandTiny.toHsl();
    const saturation = Math.floor(brandHSL.s * 100);
    const luminosity = Math.floor(brandHSL.l * 100);

    setDisplayedState({
      success: generateStateColor(SUCCESS_RANGE, saturation, luminosity),
      info: generateStateColor(INFO_RANGE, saturation, luminosity),
      warning: generateStateColor(WARNING_RANGE, saturation, luminosity),
      error: generateStateColor(ERROR_RANGE, saturation, luminosity),
    });
  }, []);

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
      <div className="container p-10 mx-auto">
        <div className="py-5">
          <h1 className="page-title from-purple-500 to-red-500">Time to select your application state colors!</h1>
          <h2 className="mt-5 text-xl text-center text-gray-200 text-gray-600">
            The state colors are used to indicate success, informations, warnings or failures and they are usually
            shades of green, blue, orange and red respectively.
          </h2>
        </div>
        {Object.values(displayedStates)
          .map(Boolean)
          .includes(true) && (
          <div className="mt-10">
            <h3 className="mx-2 text-3xl font-bold text-gray-700">State colors</h3>
            <div className="flex flex-col mt-2">
              {Object.entries(displayedStates)
                .filter(([_, color]) => Boolean(color))
                .map(([state, color]) => (
                  <Fragment key={color}>
                    <h3 className="mx-2 mt-5 text-2xl font-bold text-gray-700 capitalize">{state}</h3>
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
          <h3 className="mx-2 text-3xl font-bold text-gray-700">Reminder</h3>
          <div className="flex flex-row justify-between mt-1">
            <ColorCard color={state.primary} name="Primary" />
            <ColorCard color={state.contrast} name="Contrast" />
            <ColorCard color={state.brand} name="Brand" />
          </div>
        </div>
      </div>
    </div>
  );
}
