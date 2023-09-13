import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

interface ClassDogsState {
  dogs: Array<Dog>;
}
interface ClassDogsProps {
  filter: null | boolean;
  flipToggle: () => void;
}
// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<ClassDogsProps, ClassDogsState> {
  constructor(props: ClassDogsProps) {
    super(props);
    this.state = {
      dogs: [] as Array<Dog>,
    };
  }

  componentDidMount() {
    this.fetchDogs();
  }

  fetchDogs = () => {
    Requests.getAllDogs()
      .then((dogsData: Array<Dog>) => {
        const filter = this.props.filter;
        return dogsData.filter((dog: Dog) => {
          if (filter === null) return dog;
          return dog.isFavorite === filter;
        });
      })
      .then((data: Array<Dog>) => {
        this.setState({ dogs: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  filterDogs = () => {
    const filter = this.props.filter;

    return this.state.dogs.filter((dog: Dog) => {
      if (filter === null) return dog;
      return dog.isFavorite === filter;
    });
  };

  render() {
    const { flipToggle } = this.props;
    const filteredDogs = this.filterDogs();
    return (
      <>
        {filteredDogs?.map((dog: Dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              Requests.deleteDog(dog.id!).then(() => this.fetchDogs());
              flipToggle();
            }}
            onHeartClick={() => {
              Requests.updateDog(dog.id!, { isFavorite: false }).then(() => {
                this.fetchDogs();
                flipToggle();
              });
            }}
            onEmptyHeartClick={() => {
              Requests.updateDog(dog.id!, { isFavorite: true }).then(() => {
                this.fetchDogs();
                flipToggle();
              });
            }}
            isLoading={false}
          />
        ))}
      </>
    );
  }
}
