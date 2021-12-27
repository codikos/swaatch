import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

type HelpTitle = {
  title: string;
  text: string;
};

export default function HelpTitle({ title, text }: HelpTitle) {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const onMouseOver = () => {
    setIsDisplayed(true);
  };

  const onMouseLeave = () => {
    setIsDisplayed(false);
  };

  return (
    <>
      <h3 className="flex flex-row items-center text-3xl font-bold">
        {title}
        <span
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          className="relative ml-2 text-base text-gray-400 dark:text-gray-200 cursor-pointer"
        >
          <FontAwesomeIcon icon={faQuestionCircle} />
          <span
            className={`z-20 px-4 py-2 ml-2 text-sm text-black dark:text-white bg-white dark:bg-black rounded-sm xl:absolute xl:w-96 xl:top-1/2 xl:transform xl:-translate-y-1/2 xl:left-full ${
              isDisplayed ? 'xl:block' : 'hidden'
            }`}
          >
            {text}
          </span>
        </span>
      </h3>
      <div className="block px-4 py-2 my-2 bg-white dark:bg-black dark:text-white rounded-sm xl:hidden">{text}</div>
    </>
  );
}
