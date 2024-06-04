import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type , onclick}) {
  // const className = "bg-yellow-400 uppercase font-semibold text-stone-800 px-4 py-3 inline-block tracking-widest rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-6"

  const base = 'bg-yellow-400 uppercase font-semibold text-stone-800 tracking-widest rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';
  const style = {
    primary: `${base} px-6 py-4 md:px-4 md:py-4 text-sm`,
    small: `${base} px-4 py-2 sm:px-5 sm:py-2.5 text-xs`,
    secondary: `uppercase font-semibold text-stone-800 inline-block tracking-widest rounded-full hover:bg-stone-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed bg-transparent border-2 border-stone-400 px-8 py-3 md:px-6 md:py-4 text-sm `,
    updatebtn : `${base} px-2.5 py-1 sm:px-3.5 sm:py-2 text-sm`
  };

  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );

    if(onclick){
      return (
        <button onClick={onclick} disabled={disabled} className={style[type]}>
          {children}
        </button>
      );
    }

  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}

export default Button;
