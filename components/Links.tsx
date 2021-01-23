import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Links() {
  return (
    <nav className="flex flex-row justify-center w-screen p-4 2xl:justify-start xl:w-auto 2xl:w-auto 2xl:left-0 2xl:bottom-0 xl:left-0 xl:bottom-0 xl:absolute 2xl:absolute xl:justify-start xl:px-10 2xl:px-10">
      <a
        className="flex items-center justify-center w-8 h-8 mx-2 text-xl rounded-full outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-200"
        target="_blank"
        href="https://github.com/codikos/swaatch"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        className="flex items-center justify-center w-8 h-8 mx-2 text-xl rounded-full outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-200"
        target="_blank"
        href="https://twitter.com/telllijo"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </nav>
  );
}
