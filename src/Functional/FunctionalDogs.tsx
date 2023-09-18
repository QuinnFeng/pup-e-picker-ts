import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

interface FunctionalDogsProps {
  dogs: Array<Dog>;
  refetchDogs: () => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

const FunctionalDogs = ({
  dogs,
  refetchDogs,
  setIsLoading,
  isLoading,
}: FunctionalDogsProps) => {
  return (
    <>
      {dogs?.map((dog: Dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => {
            setIsLoading(true);
            Requests.deleteDog(dog.id!)
              .then(() => {
                refetchDogs();
              })
              .finally(() => setIsLoading(false));
          }}
          onHeartClick={() => {
            setIsLoading(true);
            Requests.updateDog(dog.id!, { isFavorite: false })
              .then(() => {
                refetchDogs();
              })
              .finally(() => setIsLoading(false));
          }}
          onEmptyHeartClick={() => {
            setIsLoading(true);
            Requests.updateDog(dog.id!, { isFavorite: true })
              .then(() => {
                refetchDogs();
              })
              .finally(() => setIsLoading(false));
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};

export default FunctionalDogs;
