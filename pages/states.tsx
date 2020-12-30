import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useContext, useState } from 'react';
import { capitalize } from 'lodash/fp';
import tinycolor from 'tinycolor2';

import { generatePalette, generateStateColor } from '@utils/colors';
import { StateContext } from '@utils/state';

import Nav from '@components/Nav';
import ColorCard from '@components/ColorCard';

const SUCCESS_RANGE = [90, 150];
const INFO_RANGE = [210, 270];
const WARNING_RANGE = [0, 60];
const ERROR_RANGE = [-30, 30];

const ranges = {
  success: SUCCESS_RANGE,
  info: INFO_RANGE,
  warning: WARNING_RANGE,
  error: ERROR_RANGE,
};

export default function StatesPage() {
  const [displayedStates, setDisplayedState] = useState({
    success: null,
    info: null,
    warning: null,
    error: null,
  });
  const [brandColorValues, setBrandColorValues] = useState({ saturation: null, luminosity: null });
  const router = useRouter();
  const state = useContext(StateContext);

  useEffect(() => {
    if (!state.primary && !state.contrast) {
      router.replace('/primary');
    }
    const brandTiny = tinycolor(state.brand);
    const brandHSL = brandTiny.toHsl();
    const saturation = Math.floor(brandHSL.s * 100);
    const luminosity = Math.floor(brandHSL.l * 100);

    setBrandColorValues({ saturation, luminosity });
  }, []);

  const toggleState = (state: string) => {
    setDisplayedState((previousStates) => ({
      ...previousStates,
      [state]: previousStates[state]
        ? null
        : generateStateColor(ranges[state], brandColorValues.saturation, brandColorValues.luminosity),
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
      <div className="container p-10 mx-auto">
        <div className="py-5">
          <h1 className="p-5 mx-auto text-xl font-bold text-center text-transparent sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl w-max bg-clip-text bg-gradient-to-r from-purple-500 to-red-500">
            Time to set your application state colors!
          </h1>
          <h2 className="mt-5 text-xl text-center text-gray-200 text-gray-600">
            The state colors are used to indicate success, informations, warnings or failures and they are usually
            shades of green, blue, orange and red respectively.
          </h2>
        </div>
        <div className="flex flex-col items-center mt-5">
          <p className="mb-5">Select the states you need:</p>
          <div>
            {Object.entries(displayedStates).map(([state, isOn]) => (
              <button key={state} className={`${isOn ? 'btn-blue' : 'btn'} mx-2`} onClick={() => toggleState(state)}>
                {capitalize(state)}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <h3 className="mx-2 text-3xl font-bold text-gray-700">Reminder</h3>
          <div className="flex flex-row justify-between mt-1">
            <ColorCard color={state.primary} name="Primary" />
            <ColorCard color={state.contrast} name="Contrast" />
            <ColorCard color={state.brand} name="Brand" />
          </div>
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
                  <>
                    <h3 className="mx-2 mt-5 text-2xl font-bold text-gray-700">{state}</h3>
                    <div key={state} className="flex flex-row justify-center mt-2">
                      {generatePalette(color, { direction: 'both', nbVariation: 6, increment: 5 }).map(
                        ({ name, color }) => (
                          <ColorCard key={name} color={color} name={name} />
                        ),
                      )}
                    </div>
                  </>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
