import { Component, FormEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { Dog } from "../types";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

const initialState = {
  name: "",
  description: "",
  image: defaultSelectedImage,
};

interface ClassCreateDogFormProps {
  refetchDogs: () => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

export class ClassCreateDogForm extends Component<ClassCreateDogFormProps> {
  state = { ...initialState };

  reset() {
    this.setState({ ...initialState });
  }

  formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { ...dogInfo } = this.state;
    const { refetchDogs, setIsLoading } = this.props;
    const dog: Dog = { ...dogInfo, isFavorite: false };
    setIsLoading(true);
    Requests.postDog(dog)
      .then(() => toast.success(`created dog ${dogInfo.name}`))
      .finally(() => {
        setIsLoading(false);
      });
    refetchDogs();
    this.reset();
  }

  render() {
    const { name, description, image } = this.state;
    const { isLoading } = this.props;
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          this.formSubmitHandler(e);
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            this.setState({ name: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id="description"
          cols={80}
          rows={10}
          value={description}
          onChange={(e) => {
            this.setState({ description: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          onChange={(e) => {
            this.setState({ image: e.target.value });
          }}
          disabled={isLoading}
          value={image}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
