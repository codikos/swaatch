type ColorCardProps = {
  color: string;
  name: string;
  highlight?: boolean;
};

export default function ColorCard({ color, name, highlight }: ColorCardProps) {
  return (
    <div
      className={`flex flex-row flex-1 mx-2 xl:flex-col 2xl:flex-col mb-2 xl:mb-0 2xl:mb-0  xl:text-center 2xl:text-center overflow-hidden rounded ${
        highlight
          ? 'border-2 border-blue-500 shadow-md bg-blue-500 text-white'
          : 'border border-grey-200 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-50 dark:border-gray-700'
      }`}
    >
      <div className="w-16 h-16 xl:w-full 2xl:w-full xl:h-28 2xl:h-32" style={{ backgroundColor: color }}></div>
      <div className="flex flex-row items-center px-4 py-2 text-sm xl:px-1 2xl:px-1 xl:flex-col 2xl:flex-col">
        <div className="mr-2 xl:mr-0 2xl:mr-0">{name}</div>
        <div>
          <span className={`font-bold uppercase ${highlight ? 'text-gray-300' : 'text-gray-900 dark:text-gray-50'}`}>
            {color}
          </span>
        </div>
      </div>
    </div>
  );
}
