import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function RevealButton({ content, header }) {
  const [arrowRotation, setArrowRotation] = useState(0);

  const flipArrowIcon = () => {
    const arrowIcon = document.getElementsByClassName(`${header}DownIcon`)[0];
    const newRotation = arrowRotation + 180;
    arrowIcon.style.transform = `rotate(${newRotation}deg)`;
    setArrowRotation(newRotation);
  };

  const showReviews = () => {
    const reviewContainer = document.getElementsByClassName(header)[0];

    if (reviewContainer.classList.contains("h-[10vh]")) {
      reviewContainer.classList.replace("h-[10vh]", "h-[95vh]");
    } else {
      reviewContainer.classList.replace("h-[95vh]", "h-[10vh]");
    }

    flipArrowIcon();
  };
  return (
    <>
      <div
        className={`${header} relative h-[10vh] overflow-hidden transition-all ease-in-out delay-300`}
      >
        <div
          className="flex items-center justify-between cursor-pointer border-y-[0.5px] border-slate-500 h-[10vh]"
          onClick={() => showReviews()}
        >
          <h1 className="text-2xl ml-10">{header}</h1>
          <div
            className={`${header}DownIcon mr-10 transition-all ease-in-out delay-150`}
          >
            <KeyboardArrowDownIcon fontSize="medium" />
          </div>
        </div>
        {content}
      </div>
    </>
  );
}

export default RevealButton;
