// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ActiveTab } from "../types";

interface FunctionalSectionProps {
  activeTab: ActiveTab;
  setActiveTab: (activeTab: ActiveTab) => void;
  favoriteCounts: number;
  unfavoriteCounts: number;
  children: ReactNode;
}

export const FunctionalSection = ({
  activeTab,
  setActiveTab,
  favoriteCounts,
  unfavoriteCounts,
  children,
}: FunctionalSectionProps) => {
  const buttonToggleHandler = (aT: ActiveTab) => {
    const value = aT === activeTab ? "all-dogs" : aT;
    setActiveTab(value);
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
            className={`selector ${activeTab == "favorite" ? "active" : ""}`}
            onClick={() => {
              buttonToggleHandler("favorite");
            }}
          >
            favorited ( {favoriteCounts} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab == "unfavorite" ? "active" : ""}`}
            onClick={() => {
              buttonToggleHandler("unfavorite");
            }}
          >
            unfavorited ( {unfavoriteCounts} )
          </div>
          <div
            className={`selector ${
              activeTab == "create-dog-form" ? "active" : ""
            }`}
            onClick={() => {
              buttonToggleHandler("create-dog-form");
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
