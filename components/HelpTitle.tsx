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
      <h3 className="flex flex-row items-center mx-2 text-3xl font-bold">
        {title}
        <span
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          className="relative ml-2 text-base text-gray-200 cursor-pointer"
        >
          <FontAwesomeIcon icon={faQuestionCircle} />
          <span
            className={`z-20 px-4 py-2 ml-2 text-sm text-white bg-black rounded-sm xl:absolute xl:min-w-max xl:top-1/2 xl:transform xl:-translate-y-1/2 xl:left-full ${
              isDisplayed ? 'xl:block' : 'hidden'
            }`}
          >
            {text}
          </span>
        </span>
      </h3>
      <div className="block px-4 py-2 mx-2 my-2 bg-black rounded-sm xl:hidden">{text}</div>
    </>
  );
}
