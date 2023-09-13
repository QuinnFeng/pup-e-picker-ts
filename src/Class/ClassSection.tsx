// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Requests } from "../api";
import { Dog } from "../types";

interface ClassSectionProps {
  index: null | number;
  setIndex: (index: number | null) => void;
  toggle: boolean;
  children: ReactNode;
}

interface ClassSectionStates {
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
      favoriteCounts: 0,
      unfavoriteCounts: 0,
    };
  }

  componentDidMount() {
    this.setCounts();
  }

  // shouldComponentUpdate(nextProps: ClassSectionProps) {
  //   return nextProps.toggle != this.props.toggle;
  // }

  componentDidUpdate(prevProps: ClassSectionProps) {
    if (prevProps.toggle != this.props.toggle) {
      this.setCounts();
    }
  }

  setCounts() {
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
    const value = index === this.props.index ? null : index;
    this.props.setIndex(value);
  }

  render() {
    const { index } = this.props;
    const { favoriteCounts, unfavoriteCounts } = this.state;
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
              className={`selector ${index === 0 ? "active" : ""}`}
              onClick={() => {
                this.buttonToggleHandler(0);
              }}
            >
              favorited ( {favoriteCounts} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${index === 1 ? "active" : ""}`}
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
