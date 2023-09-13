// you can use this type for react children if you so choose
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Requests } from "../api";
import { Dog } from "../types";

interface FunctionalSectionProps {
  index: null | number;
  setIndex: (index: number | null) => void;
  toggle: boolean;
  children: ReactNode;
}

export const FunctionalSection = ({
  index,
  setIndex,
  toggle,
  children,
}: FunctionalSectionProps) => {
  const [fC, setFC] = useState(0);
  const [uFC, setUFC] = useState(0);

  useEffect(() => {
    setCounts();
  }, [toggle]);

  const setCounts = () => {
    Requests.getAllDogs()
      .then((dogsData: Array<Dog>) => {
        const favoriteCounts = dogsData.filter(
          (dog: Dog) => dog.isFavorite === true
        ).length;
        const unfavoriteCounts = dogsData.length - favoriteCounts;
        setFC(favoriteCounts);
        setUFC(unfavoriteCounts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const buttonToggleHandler = (mark: number) => {
    const value = mark === index ? null : mark;
    setIndex(value);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${index == 0 ? "active" : ""}`}
            onClick={() => {
              buttonToggleHandler(0);
            }}
          >
            favorited ( {fC} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${index == 1 ? "active" : ""}`}
            onClick={() => {
              buttonToggleHandler(1);
            }}
          >
            unfavorited ( {uFC} )
          </div>
          <div
            className={`selector ${index == 2 ? "active" : ""}`}
            onClick={() => {
              buttonToggleHandler(2);
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
