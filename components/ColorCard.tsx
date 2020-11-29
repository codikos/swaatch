type ColorCardProps = {
  color: string;
  name: string;
};

export default function ColorCard({ color, name }: ColorCardProps) {
  return (
    <div className="mx-2 border border-gray-200 dark:border-gray-600 rounded overflow-hidden">
      <div className="w-full h-16" style={{ backgroundColor: `#${color}` }}></div>
      <div className="bg-white dark:bg-gray-800 px-4 py-2 text-center">
        <div className="text-gray-500 dark:text-gray-400">{name}</div>
        <div>
          <span className="text-blue-500 dark:text-blue-400">#</span>
          <span className="text-gray-900 dark:text-gray-200">{color}</span>
        </div>
      </div>
    </div>
  );
}
