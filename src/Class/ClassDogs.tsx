import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

interface ClassDogsProps {
  dogs: Array<Dog>;
  refetchDogs: () => void;
}
// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    const { dogs, refetchDogs } = this.props;
    return (
      <>
        {dogs?.map((dog: Dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              Requests.deleteDog(dog.id!).then(() => refetchDogs());
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
  }
}
