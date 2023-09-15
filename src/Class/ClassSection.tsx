// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ActiveTab} from "../types";

interface ClassSectionProps {
  activeTab: ActiveTab;
  setActiveTab: (activeTab: ActiveTab) => void;
  favoriteCounts: number;
  unfavoriteCounts: number;
  children: ReactNode;
}

export class ClassSection extends Component<
  ClassSectionProps
> {

  buttonToggleHandler(activeTab:ActiveTab) {
    const value = activeTab === this.props.activeTab ? "all-dogs" : activeTab;
    this.props.setActiveTab(value);
  }

  render() {
    const { activeTab, favoriteCounts, unfavoriteCounts } = this.props;
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
              className={`selector ${activeTab=="favorite"? "active" : ""}`}
              onClick={() => {
                this.buttonToggleHandler("favorite");
              }}
            >
              favorited ( {favoriteCounts} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${activeTab=="unfavorite"? "active" : ""}`}
              onClick={() => {
                this.buttonToggleHandler("unfavorite");
              }}
            >
              unfavorited ( {unfavoriteCounts} )
            </div>
            <div
              className={`selector ${activeTab=="create-dog-form"? "active" : ""}`}
              onClick={() => {
                this.buttonToggleHandler("create-dog-form");
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
