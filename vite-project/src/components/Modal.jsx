import { useEffect } from "react";

const Modal = ({ message }) => {
  return (
    <div className="Modal fixed top-[10vh] left-[50%] translate-x-[-50%] flex items-center justify-center transition-all ease-in-out delay-100 opacity-0 invisible">
      <div className="bg-slate-500 rounded-lg shadow-lg">
        <h1 className="text-xl text-white px-8 my-4">{message}</h1>
      </div>
    </div>
  );
};

export default Modal;
