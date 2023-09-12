// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Requests } from "../api";
import { Dog } from "../types";

interface ClassSectionProps {
  setIndex: (index: number | null) => void;
  children: ReactNode;
}

interface ClassSectionStates {
  index: null | number;
  favoriteCounts: number;
  unfavoriteCounts: number;
}

export class ClassSection extends Component<
  ClassSectionProps,
  ClassSectionStates
> {
  constructor(props: ClassSectionProps) {
    super(props);
    this.state = {
      index: null,
      favoriteCounts: 0,
      unfavoriteCounts: 0,
    };
  }

  componentDidMount() {
    Requests.getAllDogs()
      .then((dogsData: Array<Dog>) => {
        const favoriteCounts = dogsData.filter(
          (dog: Dog) => dog.isFavorite === true
        ).length;
        const unfavoriteCounts = dogsData.length - favoriteCounts;
        this.setState({ favoriteCounts, unfavoriteCounts });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  buttonToggleHandler(index: number) {
    const value = index === this.state.index ? null : index;
    this.setState({ index: value });
    this.props.setIndex(value);
  }

  render() {
    const { index, favoriteCounts, unfavoriteCounts } = this.state;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${index == 0 ? "active" : ""}`}
              onClick={() => {
                this.buttonToggleHandler(0);
              }}
            >
              favorited ( {favoriteCounts} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${index == 1 ? "active" : ""}`}
              onClick={() => {
                this.buttonToggleHandler(1);
              }}
            >
              unfavorited ( {unfavoriteCounts} )
            </div>
            <div
              className={`selector ${index == 2 ? "active" : ""}`}
              onClick={() => {
                this.buttonToggleHandler(2);
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{this.props.children}</div>
      </section>
    );
  }
}
