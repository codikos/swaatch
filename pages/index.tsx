export default function IndexPage() {
  return (
    <div>
      <div className="py-20">
        <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">Swaatch!</h1>
        <h2 className="text-2xl mt-5 text-center text-gray-400 dark:text-gray-300">
          Generate accessible color palettes easily.
        </h2>
      </div>
      <div className="flex flex-row justify-center">
        <a href="/grays" className="btn-blue">
          Let's begin!
        </a>
      </div>
    </div>
  );
}
