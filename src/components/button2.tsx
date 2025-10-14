import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';

interface Button2Props {
  disabled?: boolean;
  onClick?: () => void;
}

const Button2: React.FC<Button2Props> = ({ disabled = false, onClick }) => {
  const { t } = useTranslations();
  const buttonClasses = `flex justify-center gap-2 items-center shadow-xl text-lg lg:font-semibold border-gray-50 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  return (
    <>
      <button
        type="submit"
        className={buttonClasses}
        disabled={disabled}
        onClick={onClick}
      >
        <span className="absolute inset-0 bg-gray-50 -z-10"></span>
        <span
          className={`absolute w-full h-full bg-emerald-500 -z-10 transition-all duration-700 -left-full rounded-full aspect-square scale-150 ${
            !disabled ? 'group-hover:left-0 group-hover:scale-150' : ''
          }`}
        ></span>
        <span className={`text-black ${!disabled ? 'group-hover:text-white' : ''}`}>
        {t('form.buttons.next', 'Next')}
        </span>
        <svg
          className={`w-8 h-8 justify-end ease-linear duration-300 rounded-full border border-gray-700 p-2 rotate-45 ${
            !disabled ? 'group-hover:rotate-90 group-hover:border-none' : ''
          }`}
          viewBox="0 0 16 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            className={`fill-black ${!disabled ? 'group-hover:fill-white' : ''}`}
          ></path>
        </svg>
      </button>
    </>
  );
};

export default Button2;
