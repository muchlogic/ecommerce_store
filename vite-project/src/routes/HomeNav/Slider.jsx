import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

function Slider() {
  return (
    <>
      <div className="flex overflow-hidden bg-slate-500 text-2xl py-2">
        <div className="flex flex-row animate-slide_left">
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>you</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>smell</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>like</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>horse</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>shit</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>dog</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>water</h1>
          </div>
        </div>
        <div className="flex flex-row animate-slide_left">
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>you</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>smell</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>like</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>horse</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>shit</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>dog</h1>
          </div>
          <div className="w-[300px] flex justify-center items-center border-l-[0.5px] border-slate-700">
            <h1>water</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
