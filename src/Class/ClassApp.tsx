import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";

export class ClassApp extends Component {
  state = {
    activeTab: "all-dogs" as ActiveTab,
    dogs: [] as Array<Dog>,
    favoriteCounts: 0,
    unfavoriteCounts: 0,
  };

  componentDidMount() {
    this.fetchDogs();
  }

  fetchDogs = () => {
    Requests.getAllDogs()
      .then((dogs: Array<Dog>) => {
        const favoriteCounts = dogs.filter(
          (dog) => dog.isFavorite === true
        ).length;
        const unfavoriteCounts = dogs.length - favoriteCounts;
        this.setState({ dogs, favoriteCounts, unfavoriteCounts });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  setActiveTab = (activeTab: string) => {
    this.setState({ activeTab });
  };

  filterDogs = (activeTab: ActiveTab, dogs: Array<Dog>) => {
    return dogs.filter((dog: Dog) => {
      if (activeTab === "create-dog-form" || activeTab === "all-dogs")
        return dog;
      return dog.isFavorite == (activeTab === "favorite") ? true : false;
    });
  };

  render() {
    const { activeTab, dogs, favoriteCounts, unfavoriteCounts } = this.state;
    const isDisplayForm = activeTab === "create-dog-form";
    const filteredDogs = this.filterDogs(activeTab, dogs);

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          activeTab={activeTab}
          favoriteCounts={favoriteCounts}
          unfavoriteCounts={unfavoriteCounts}
          setActiveTab={this.setActiveTab}
        >
          {isDisplayForm ? (
            <ClassCreateDogForm refetchDogs={this.fetchDogs} />
          ) : (
            <ClassDogs dogs={filteredDogs} refetchDogs={this.fetchDogs} />
          )}
        </ClassSection>

        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
