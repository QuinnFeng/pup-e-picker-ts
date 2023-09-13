import { DogCard } from "../Shared/DogCard";

import { useState, useEffect } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

interface FunctionalDogsProps {
  filter: null | boolean;
  flipToggle: () => void;
}

const FunctionalDogs = ({ filter, flipToggle }: FunctionalDogsProps) => {
  const [dogs, setDogs] = useState<Array<Dog>>([]);

  const fetchDogs = () => {
    Requests.getAllDogs()
      .then((dogsData: Array<Dog>) => {
        return dogsData.filter((dog: Dog) => {
          if (filter === null) return dog;
          return dog.isFavorite === filter;
        });
      })
      .then((data: Array<Dog>) => {
        setDogs(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchDogs();
  }, [filter]);

  const filterDogs = () => {
    return dogs.filter((dog: Dog) => {
      if (filter === null) return dog;
      return dog.isFavorite === filter;
    });
  };

  return (
    <>
      {filterDogs()?.map((dog: Dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => {
            Requests.deleteDog(dog.id!).then(() => {
              fetchDogs();
              flipToggle();
            });
          }}
          onHeartClick={() => {
            Requests.updateDog(dog.id!, { isFavorite: false }).then(() => {
              fetchDogs();
              flipToggle();
            });
          }}
          onEmptyHeartClick={() => {
            Requests.updateDog(dog.id!, { isFavorite: true }).then(() => {
              fetchDogs();
              flipToggle();
            });
          }}
          isLoading={false}
        />
      ))}
    </>
  );
};

export default FunctionalDogs;
