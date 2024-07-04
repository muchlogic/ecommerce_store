import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

function Slider() {
  return (
    <>
      <div className="relative flex overflow-hidden bg-slate-500 text-2xl py-2">
        <div className="flex flex-row animate-slide_left">
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>dog</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>shit</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>ass</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>cocks</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>bbc</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>chain</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>dealer</h1>
          </div>
        </div>
        <div className="flex flex-row animate-slide_left">
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>dog</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>shit</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>ass</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>cocks</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>bbc</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>chain</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>dealer</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
