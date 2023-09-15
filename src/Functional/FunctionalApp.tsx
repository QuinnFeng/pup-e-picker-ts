import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";

import { FunctionalSection } from "./FunctionalSection";

import FunctionalDogs from "./FunctionalDogs";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("all-dogs");
  const [dogs, setDogs] = useState<Array<Dog>>([]);
  const [favoriteCounts, setFavoriteCounts] = useState(0);
  const [unfavoriteCounts, setUnfavoriteCounts] = useState(0);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = () => {
    Requests.getAllDogs()
      .then((dogs: Array<Dog>) => {
        const favoriteCounts = dogs.filter(
          (dog) => dog.isFavorite === true
        ).length;
        const unfavoriteCounts = dogs.length - favoriteCounts;
        setDogs(dogs);
        setFavoriteCounts(favoriteCounts);
        setUnfavoriteCounts(unfavoriteCounts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const filteredDogs = (() => {
    return dogs.filter((dog) => {
      if (activeTab === "create-dog-form" || activeTab === "all-dogs")
        return dog;
      return dog.isFavorite === (activeTab === "favorite") ? true : false;
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
          <FunctionalCreateDogForm refetchDogs={fetchDogs} />
        ) : (
          <FunctionalDogs dogs={filteredDogs} refetchDogs={fetchDogs} />
        )}
      </FunctionalSection>
    </div>
  );
}
