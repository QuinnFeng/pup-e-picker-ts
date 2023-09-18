import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

interface ClassDogsProps {
  dogs: Array<Dog>;
  refetchDogs: () => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}
// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    const { dogs, refetchDogs, setIsLoading, isLoading } = this.props;
    return (
      <>
        {dogs?.map((dog: Dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              setIsLoading(true);
              Requests.deleteDog(dog.id!)
                .then(() => refetchDogs())
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
  }
}
