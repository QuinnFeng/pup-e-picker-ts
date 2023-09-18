import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";

import { FunctionalSection } from "./FunctionalSection";

import FunctionalDogs from "./FunctionalDogs";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("all-dogs");
  const [dogs, setDogs] = useState<Array<Dog>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const favoriteCounts = dogs.filter(
    (dog: Dog) => dog.isFavorite === true
  ).length;
  const unfavoriteCounts = dogs.length - favoriteCounts;

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = () => {
    Requests.getAllDogs()
      .then((dogs: Array<Dog>) => setDogs(dogs))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const filteredDogs = (() => {
    if (activeTab === "create-dog-form" || activeTab === "all-dogs")
      return dogs;
    return dogs.filter((dog) => {
      return dog.isFavorite === (activeTab === "favorite");
    });
  })();

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        setActiveTab={setActiveTab}
        favoriteCounts={favoriteCounts}
        unfavoriteCounts={unfavoriteCounts}
        activeTab={activeTab}
      >
        {activeTab == "create-dog-form" ? (
          <FunctionalCreateDogForm
            refetchDogs={fetchDogs}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        ) : (
          <FunctionalDogs
            dogs={filteredDogs}
            refetchDogs={fetchDogs}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
