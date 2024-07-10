import { useState, useEffect } from "react";
import RevealButton from "../../RevealButton";

function TestingTab() {
  return (
    <>
      <RevealButton
        header={"Test"}
        content={
          <div className="bg-black text-black m-2 h-[200px] w-[200px]">
            <h1>dog water</h1>
          </div>
        }
      />
    </>
  );
}

export default TestingTab;
