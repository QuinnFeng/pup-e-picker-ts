import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

interface FunctionalDogsProps {
  dogs: Array<Dog>;
  refetchDogs: () => void;
}

const FunctionalDogs = ({ dogs, refetchDogs }: FunctionalDogsProps) => {
  return (
    <>
      {dogs?.map((dog: Dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => {
            Requests.deleteDog(dog.id!).then(() => {
              refetchDogs();
            });
          }}
          onHeartClick={() => {
            Requests.updateDog(dog.id!, { isFavorite: false }).then(() => {
              refetchDogs();
            });
          }}
          onEmptyHeartClick={() => {
            Requests.updateDog(dog.id!, { isFavorite: true }).then(() => {
              refetchDogs();
            });
          }}
          isLoading={false}
        />
      ))}
    </>
  );
};

export default FunctionalDogs;
