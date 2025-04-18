import Link from 'next/link';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer
      className={`px-4 pt-4 mt-auto text-center border-gray-400 dark:border-gray-500 ${className}`}
    >
      <div
        className={`w-[90%] mx-auto absolute left-1/2 -translate-x-1/2 h-[2px] bg-gray-400 dark:bg-gray-500 rounded-full before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:w-[10vw] before:h-full before:bg-inherit before:rounded-full`}
      />

      <p className="pt-4 text-sm text-gray-900 dark:text-gray-400">
        © {new Date().getFullYear()} PlayRadar. All rights reserved.
      </p>

      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
        Developed by Gerardo Fernández.
      </p>

      <Link
        href="https://gerardofdez7.github.io/data_analyst/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-700 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
      >
        Contact
      </Link>
    </footer>
  );
};

export default Footer;
