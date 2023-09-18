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
    isLoading: false,
  };

  componentDidMount() {
    this.fetchDogs();
  }

  fetchDogs = () => {
    Requests.getAllDogs()
      .then((dogs: Array<Dog>) => this.setState({ dogs }))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  setActiveTab = (activeTab: string) => {
    this.setState({ activeTab });
  };

  filterDogs = (activeTab: ActiveTab, dogs: Array<Dog>) => {
    if (activeTab === "create-dog-form" || activeTab === "all-dogs")
      return dogs;
    return dogs.filter((dog: Dog) => {
      return dog.isFavorite == (activeTab === "favorite");
    });
  };

  render() {
    const { activeTab, dogs, isLoading } = this.state;
    const isDisplayForm = activeTab === "create-dog-form";
    const filteredDogs = this.filterDogs(activeTab, dogs);
    const favoriteCounts = dogs.filter(
      (dog: Dog) => dog.isFavorite === true
    ).length;
    const unfavoriteCounts = dogs.length - favoriteCounts;

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
            <ClassCreateDogForm
              refetchDogs={this.fetchDogs}
              setIsLoading={this.setIsLoading}
              isLoading={isLoading}
            />
          ) : (
            <ClassDogs
              dogs={filteredDogs}
              refetchDogs={this.fetchDogs}
              setIsLoading={this.setIsLoading}
              isLoading={isLoading}
            />
          )}
        </ClassSection>

        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
