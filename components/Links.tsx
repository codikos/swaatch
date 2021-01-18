import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Links() {
  return (
    <nav className="flex flex-row justify-center w-screen p-4 2xl:justify-start xl:w-auto 2xl:w-auto 2xl:left-0 2xl:bottom-0 xl:left-0 xl:bottom-0 xl:absolute 2xl:absolute xl:justify-start xl:px-10 2xl:px-10">
      <a className="mx-2 text-xl" target="_blank" href="https://github.com/codikos/swaatch">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a className="mx-2 text-xl" target="_blank" href="https://twitter.com/telllijo">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </nav>
  );
}
