import React from 'react';

type ColorCardProps = {
  color: string;
  name: string;
  highlight?: boolean;
  contrastScore?: number;
};

export default function ColorCard({ color, name, highlight, contrastScore }: ColorCardProps) {
  return (
    <div
      className={`shadow-md flex flex-row flex-1 xl:flex-col xl:text-center overflow-hidden rounded ${
        highlight
          ? 'ring-2 ring-blue-500 shadow-lg bg-blue-500 text-white'
          : 'bg-white dark:bg-gray-900 text-gray-50 dark:border-gray-700'
      }`}
    >
      <div className="flex justify-start items-end w-16 h-16 xl:w-full 2xl:w-full xl:h-28 2xl:h-32 xl:bg-gradient-to-t xl:from-black/50 xl:via-transparent xl:to-transparent" style={{ backgroundColor: color }}>
        <div className="text-sm ml-1 py-2 hidden xl:block">{name}</div>
      </div>
      <div className="flex flex-col items-stretch flex-1 px-2 xl:px-0">
        <div className="py-1 xl:py-2 xl:hidden">{name}</div>
        <div className={`xl:px-4 xl:py-2 flex-1 xl:text-center font-bold uppercase ${highlight ? 'text-gray-50' : 'text-gray-900 dark:text-gray-50'}`}>
          {color}
        </div>
        {contrastScore && (
          <div
            className={`hidden font-mono xl:flex text-white justify-center h-full p-2 ${
              contrastScore >= 4.5 ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            <div>
              <span className="font-bold">{contrastScore}</span>:1
            </div>
          </div>
        )}
      </div>
      {contrastScore && (
        <div
          className={`flex xl:hidden h-16 font-mono text-white w-24 justify-center items-center p-2 text-right ${
            contrastScore > 4.5 ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <span className="font-bold">{contrastScore}</span>:1
        </div>
      )}
    </div>
  );
}
