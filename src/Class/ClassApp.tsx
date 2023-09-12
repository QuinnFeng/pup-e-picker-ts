import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

const filter = { "0": true, "1": false };
export class ClassApp extends Component {
  state = { index: null as number | null };

  setIndex = (index: null | number) => {
    this.setState({ index });
  };

  convertToBoolean = (input: null | number) =>
    input === null ? null : input === 0;

  render() {
    const { index } = this.state;
    const isDisplayForm = index === 2;
    const filterValue: null | boolean = this.convertToBoolean(index);
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection setIndex={this.setIndex}>
          {isDisplayForm ? (
            <ClassCreateDogForm />
          ) : (
            <ClassDogs filter={filterValue} />
          )}
        </ClassSection>

        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
