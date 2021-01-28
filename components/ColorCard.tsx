type ColorCardProps = {
  color: string;
  name: string;
  highlight?: boolean;
  contrastScore?: number;
};

export default function ColorCard({ color, name, highlight, contrastScore }: ColorCardProps) {
  return (
    <div
      className={`shadow-md flex flex-row flex-1 mx-2 xl:flex-col 2xl:flex-col mb-2 xl:mb-0 2xl:mb-0  xl:text-center 2xl:text-center overflow-hidden rounded ${
        highlight
          ? 'ring-2 ring-blue-500 shadow-lg bg-blue-500 text-white'
          : 'bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-50 dark:border-gray-700'
      }`}
    >
      <div className="w-16 h-16 xl:w-full 2xl:w-full xl:h-28 2xl:h-32" style={{ backgroundColor: color }}></div>
      <div className="flex flex-col items-stretch flex-1 px-2 xl:px-0">
        <div className="py-1 mr-2 xl:py-2 xl:text-center">{name}</div>
        <div className="flex flex-row flex-1 text-sm xl:justify-start">
          {contrastScore && (
            <div
              className={`hidden xl:flex rounded-tr-md text-white items-center h-full p-2 text-right ${
                contrastScore >= 4.5 ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <span className="font-bold">{contrastScore}</span>:1
            </div>
          )}
          <div
            className={`xl:px-4 xl:py-2 flex-1 xl:text-center font-bold uppercase ${
              highlight ? 'text-gray-300' : 'text-gray-900 dark:text-gray-50'
            }`}
          >
            {color}
          </div>
        </div>
      </div>
      {contrastScore && (
        <div
          className={`flex xl:hidden h-16 text-white items-center p-2 text-right ${
            contrastScore > 4.5 ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <span className="font-bold">{contrastScore}</span>:1
        </div>
      )}
    </div>
  );
}
