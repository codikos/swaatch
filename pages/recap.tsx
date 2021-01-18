import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTheme } from 'next-themes';

import Nav from '@components/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { StateContext } from '@utils/state';
import { generatePalette } from '@utils/colors';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import { vs, vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ColorCard from '@components/ColorCard';

SyntaxHighlighter.registerLanguage('css', css);

const paletteOptions = (name: string) => ({ direction: 'both', nbVariation: 6, increment: 5, name });

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
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (!state.primary && !state.contrast) {
      router.replace('/primary');
    }
    setPrimary(generatePalette(state.primary, paletteOptions('primary')));
    setContrast(generatePalette(state.contrast, paletteOptions('contrast')));
    setBrand(generatePalette(state.brand, paletteOptions('brand')));
    setSuccess(generatePalette(state.states.success, paletteOptions('success')));
    setInfo(generatePalette(state.states.info, paletteOptions('info')));
    setWarning(generatePalette(state.states.warning, paletteOptions('warning')));
    setError(generatePalette(state.states.error, paletteOptions('error')));
  }, []);

  useEffect(() => {
    setCSSResult(`:root {

${primary.map(({ name, color }) => `\t--${name}: ${color};\n`).join('')}
${contrast.map(({ name, color }) => `\t--${name}: ${color};\n`).join('')}
${brand.map(({ name, color }) => `\t--${name}: ${color};\n`).join('')}
${success.map(({ name, color }) => `\t--${name}: ${color};\n`).join('')}
${info.map(({ name, color }) => `\t--${name}: ${color};\n`).join('')}
${warning.map(({ name, color }) => `\t--${name}: ${color};\n`).join('')}
${error.map(({ name, color }) => `\t--${name}: ${color};\n`).join('')}
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
            {primary.map(({ name, color }) => (
              <ColorCard key={name} name={name} color={color} />
            ))}
          </div>
          <div className="flex flex-col justify-center mt-2 xl:flex-row 2xl:flex-row">
            {contrast.map(({ name, color }) => (
              <ColorCard key={name} name={name} color={color} />
            ))}
          </div>
          <div className="flex flex-col justify-center mt-2 xl:flex-row 2xl:flex-row">
            {brand.map(({ name, color }) => (
              <ColorCard key={name} name={name} color={color} />
            ))}
          </div>
          <div className="flex flex-col justify-center mt-2 xl:flex-row 2xl:flex-row">
            {success.map(({ name, color }) => (
              <ColorCard key={name} name={name} color={color} />
            ))}
          </div>
          <div className="flex flex-col justify-center mt-2 xl:flex-row 2xl:flex-row">
            {info.map(({ name, color }) => (
              <ColorCard key={name} name={name} color={color} />
            ))}
          </div>
          <div className="flex flex-col justify-center mt-2 xl:flex-row 2xl:flex-row">
            {warning.map(({ name, color }) => (
              <ColorCard key={name} name={name} color={color} />
            ))}
          </div>
          <div className="flex flex-col justify-center mt-2 xl:flex-row 2xl:flex-row">
            {error.map(({ name, color }) => (
              <ColorCard key={name} name={name} color={color} />
            ))}
          </div>
          <div className="relative flex flex-col p-2 mx-2 mt-10 bg-gray-200 rounded-md dark:bg-gray-900">
            <button
              onClick={copyCSS}
              className="absolute top-0 right-0 px-4 py-2 m-2 text-sm bg-black rounded-bl-md bg-opacity-30"
            >
              Copy to clipboard
            </button>
            <SyntaxHighlighter id="code" language="css" style={theme === 'light' ? vs : vscDarkPlus} className="m-0">
              {cssResult}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
