import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

export class ClassApp extends Component {
  state = { index: null as number | null, toggle: false };

  setIndex = (index: null | number) => {
    this.setState({ index });
  };

  // update change to ClassSection result from interactions
  // make in ClassCreateDogForm and ClassDogs
  flipToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  convertToBoolean = (input: null | number) =>
    input === null ? null : input === 0;

  render() {
    const { index, toggle } = this.state;
    const isDisplayForm = index === 2;
    const filterValue: null | boolean = this.convertToBoolean(index);
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection index={index} setIndex={this.setIndex} toggle={toggle}>
          {isDisplayForm ? (
            <ClassCreateDogForm flipToggle={this.flipToggle} />
          ) : (
            <ClassDogs filter={filterValue} flipToggle={this.flipToggle} />
          )}
        </ClassSection>

        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
