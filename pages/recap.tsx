import type { ChangeEvent, FC, FormEvent } from 'react';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import { isEmpty, trim } from 'lodash/fp';

import Nav from '@components/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { StateContext } from '@utils/state';
import { generatePalette } from '@utils/colors';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import { vs, vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ColorCard from '@components/ColorCard';
import Links from '@components/Links';

SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('json', json);

const paletteOptions = (name: string) => ({ direction: 'both', nbVariation: 6, increment: 5, name });

const stripComma = (str: string) => trim(str).slice(0, -1);

type OutputProps = {
  onCopy: () => void;
  output: string;
}
const Output: FC<OutputProps> = ({onCopy, output}) => {
  const { theme } = useTheme();
  
  return (
    <div className="relative flex flex-col p-2 mt-10 bg-gray-200 rounded-md dark:bg-gray-900">
      <button
        onClick={onCopy}
        className="absolute top-0 right-0 px-4 py-2 m-2 text-sm bg-black rounded-bl-md bg-opacity-30 hover:text-blue-500"
      >
        <FontAwesomeIcon icon={faCopy} /> Copy to clipboard
      </button>
      <SyntaxHighlighter id="code" language="css" style={theme === 'light' ? vs : vscDarkPlus} className="m-0">
        {output}
      </SyntaxHighlighter>
    </div>
  );
};

type Output = 'css' | 'json';

export default function RecapPage() {
  const contentElm = useRef(null);

  const state = useContext(StateContext);

  const [primary, setPrimary] = useState([]);
  const [contrast, setContrast] = useState([]);
  const [brand, setBrand] = useState([]);
  const [success, setSuccess] = useState([]);
  const [info, setInfo] = useState([]);
  const [warning, setWarning] = useState([]);
  const [error, setError] = useState([]);
  const [cssResult, setCSSResult] = useState('');
  const [jsonResult, setJSONResult] = useState('');
  const [output, setOutput] = useState<Output>('css');

  const router = useRouter();

  const { theme } = useTheme();

  useEffect(() => {
    if (!state.primary && !state.contrast) {
      router.replace('/primary');
    }
    setPrimary(generatePalette(state.primary, paletteOptions('primary')));
    setContrast(generatePalette(state.contrast, paletteOptions('contrast')));
    setBrand(generatePalette(state.brand, paletteOptions('brand')));
    state.states.success && setSuccess(generatePalette(state.states.success, paletteOptions('success')));
    state.states.info && setInfo(generatePalette(state.states.info, paletteOptions('info')));
    state.states.warning && setWarning(generatePalette(state.states.warning, paletteOptions('warning')));
    state.states.error && setError(generatePalette(state.states.error, paletteOptions('error')));
  }, []);

  useEffect(() => {
    setCSSResult(`:root {
    ${trim(`
${primary.map(({ name, color }) => `\t--${name}: ${color};\n`).join('')}
${contrast.map(({ name, color }) => `\t--${name}: ${color};\n`).join('')}
${brand.map(({ name, color }) => `\t--${name}: ${color};\n`).join('')}
${!isEmpty(success) ? success.map(({ name, color }) => `\t--${name}: ${color};\n`).join('') + '\n' : ''}${
  !isEmpty(info) ? info.map(({ name, color }) => `\t--${name}: ${color};\n`).join('') + '\n' : ''
}${!isEmpty(warning) ? warning.map(({ name, color }) => `\t--${name}: ${color};\n`).join('') + '\n' : ''}${
  !isEmpty(error) ? error.map(({ name, color }) => `\t--${name}: ${color};\n`).join('') : ''
}
`)}
}`);

    setJSONResult(`{
    ${stripComma(`
${primary.map(({ name, color }) => `\t"${name}": "${color}",\n`).join('')}
${contrast.map(({ name, color }) => `\t"${name}": "${color}",\n`).join('')}
${brand.map(({ name, color }) => `\t"${name}": "${color}",\n`).join('')}
${!isEmpty(success) ? success.map(({ name, color }) => `\t"${name}": "${color}",\n`).join('') + '\n' : ''}${
  !isEmpty(info) ? info.map(({ name, color }) => `\t"${name}": "${color}",\n`).join('') + '\n' : ''
}${!isEmpty(warning) ? warning.map(({ name, color }) => `\t"${name}": "${color}",\n`).join('') + '\n' : ''}${
  !isEmpty(error) ? error.map(({ name, color }) => `\t"${name}": "${color}",\n`).join('') : ''
}
`)}
}`);
  }, [primary, contrast, brand, success, info, warning, error]);

  const scrollToContent = () => contentElm.current.scrollIntoView();

  const copyCSS = async () => {
    try {
      await navigator.clipboard.writeText(cssResult);
    } catch (e) {
      console.log(e);
    }
  };

  const copyJSON = async () => {
    try {
      await navigator.clipboard.writeText(jsonResult);
    } catch (e) {
      console.log(e);
    }
  };

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
          <h1 className="page-title from-pink-500 to-yellow-500">Let&apos;s see your palette now!</h1>
          <p className="mt-5">Here is the full color palette.</p>
          <p className="mt-5">
            We also generated a block of CSS code that includes all your colors in CSS custom properties. There are some
            interesting articles to learn about them{' '}
            <a
              target="_blank"
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/--*"
              className="text-blue-500 hover:underline active:text-purple-500" rel="noreferrer"
            >
              here
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              href="https://css-tricks.com/css-custom-properties-theming/"
              className="text-blue-500 hover:underline active:text-purple-500" rel="noreferrer"
            >
              here
            </a>
            .
          </p>
          <p className="mt-5">Now, all you need to do is to copy it in your project and you&apos;re good to go.</p>
          <button className="scroll-btn" onClick={scrollToContent}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div className="page-right-container" ref={contentElm}>
          <div className="flex flex-col justify-center w-auto px-4 space-y-8 py-28 xl:mx-2 xl:justify-start xl:px-10">
            <div className="flex flex-col justify-center xl:flex-row xl:space-y-0 xl:space-x-2 space-y-2">
              {primary.map(({ name, color }) => (
                <ColorCard key={name} name={name} color={color} />
              ))}
            </div>
            <div className="flex flex-col justify-center xl:flex-row xl:space-y-0 xl:space-x-2 space-y-2">
              {contrast.map(({ name, color }) => (
                <ColorCard key={name} name={name} color={color} />
              ))}
            </div>
            <div className="flex flex-col justify-center xl:flex-row xl:space-y-0 xl:space-x-2 space-y-2">
              {brand.map(({ name, color }) => (
                <ColorCard key={name} name={name} color={color} />
              ))}
            </div>
            <div className="flex flex-col justify-center xl:flex-row xl:space-y-0 xl:space-x-2 space-y-2">
              {success.map(({ name, color }) => (
                <ColorCard key={name} name={name} color={color} />
              ))}
            </div>
            <div className="flex flex-col justify-center xl:flex-row xl:space-y-0 xl:space-x-2 space-y-2">
              {info.map(({ name, color }) => (
                <ColorCard key={name} name={name} color={color} />
              ))}
            </div>
            <div className="flex flex-col justify-center xl:flex-row xl:space-y-0 xl:space-x-2 space-y-2">
              {warning.map(({ name, color }) => (
                <ColorCard key={name} name={name} color={color} />
              ))}
            </div>
            <div className="flex flex-col justify-center xl:flex-row xl:space-y-0 xl:space-x-2 space-y-2">
              {error.map(({ name, color }) => (
                <ColorCard key={name} name={name} color={color} />
              ))}
            </div>

            {/* -- Output -- */}
            <div>
              <div className="w-full xl:w-72">
                <label htmlFor="output">Select the desired output</label>
                <select
                  id="output"
                  name="output"
                  className={`${theme === 'light' ? 'text-gray-900 bg-white border-gray-300' : 'text-gray-100 bg-gray-900 border-gray-700'} mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md`}
                  onChange={({target: {value}}: ChangeEvent<HTMLSelectElement>) => setOutput(value as Output)}
                >
                  <option value="css">CSS</option>
                  <option value="json">JSON</option>
                </select>
              </div>
              {output === 'css' && <Output output={cssResult} onCopy={copyCSS} />}
              {output === 'json' && <Output output={jsonResult} onCopy={copyJSON} />}
            </div>
            {/* -- END Output -- */}
          </div>
        </div>
      </div>
      <Links />
    </div>
  );
}
