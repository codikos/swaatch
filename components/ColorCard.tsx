type ColorCardProps = {
  color: string;
  name: string;
};

export default function ColorCard({ color, name }: ColorCardProps) {
  const isBase = name === 'base';
  return (
    <div
      className={`flex flex-col flex-1 mx-2  uppercase text-center overflow-hidden rounded ${
        isBase
          ? 'border-2 border-blue-500 shadow-md bg-blue-500 text-white'
          : 'border border-grey-200 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-50 dark:border-gray-700'
      }`}
    >
      <div className="w-full h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 2xl:h-32" style={{ backgroundColor: color }}></div>
      <div className="px-4 py-2">
        <div>{name}</div>
        <div>
          <span className={`font-bold ${isBase ? 'text-gray-300' : 'text-gray-900 dark:text-gray-50'}`}>{color}</span>
        </div>
      </div>
    </div>
  );
}
