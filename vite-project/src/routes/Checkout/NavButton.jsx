import { Link } from "react-router-dom";

function NavButton({ name, link }) {
  const addHiddenUnderlineText = () => {
    const underline = document.getElementsByClassName(name)[0];
    underline.classList.replace("translate-x-[-110%]", "translate-x-0");
  };

  const removeHiddenUnderlineText = () => {
    const underline = document.getElementsByClassName(name)[0];
    underline.classList.replace("translate-x-0", "translate-x-[-110%]");
  };

  return (
    <>
      <Link
        to={link}
        className="relative overflow-hidden h-[22px] hover:text-slate-500"
        onMouseOver={() => addHiddenUnderlineText()}
        onMouseLeave={() => removeHiddenUnderlineText()}
      >
        {name}
        <div
          className={`${name} hidden-underline transition-transform delay-100 ease-in translate-x-[-110%] bg-black w-full h-[0.5px] absolute top-5`}
        ></div>
      </Link>
    </>
  );
}

export default NavButton;
