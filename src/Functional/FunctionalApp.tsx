import { useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";

import { FunctionalSection } from "./FunctionalSection";

import FunctionalDogs from "./FunctionalDogs";

export function FunctionalApp() {
  const [index, setIndex] = useState<null | number>(null);
  const [toggle, setToggle] = useState(false);

  const flipToggle = () => setToggle(!toggle);
  const convertToBoolean = (input: null | number) =>
    input === null ? null : input === 0;

  const isDisplayForm = index === 2;
  const filterValue: null | boolean = convertToBoolean(index);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection index={index} setIndex={setIndex} toggle={toggle}>
        {isDisplayForm ? (
          <FunctionalCreateDogForm flipToggle={flipToggle} />
        ) : (
          <FunctionalDogs filter={filterValue} flipToggle={flipToggle} />
        )}
      </FunctionalSection>
    </div>
  );
}
