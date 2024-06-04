import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

function About() {
  return (
    <>
      <div className="About-container px-5 py-5">
        <h1>About section</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
          distinctio repellendus nam et, natus temporibus cum dolor eaque
          corrupti veritatis eius. Sequi blanditiis temporibus aliquid minima
          eum unde obcaecati praesentium?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A obcaecati,
          similique expedita ipsam reprehenderit doloremque voluptates itaque
          corrupti ex quas eius ipsa facilis in quidem, laborum cupiditate dolor
          amet distinctio!
        </p>
      </div>
    </>
  );
}

export default About;
