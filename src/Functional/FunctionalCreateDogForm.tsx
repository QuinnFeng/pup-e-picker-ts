import { FormEvent, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { Dog } from "../types";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

interface FunctionalCreateDogFormProps {
  refetchDogs: () => void;
}
export const FunctionalCreateDogForm = ({
  refetchDogs,
}: FunctionalCreateDogFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(defaultSelectedImage);
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setName("");
    setDescription("");
    setImage(defaultSelectedImage);
  };

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dog: Dog = { name, description, image, isFavorite: false };
    setIsLoading(true);
    Requests.postDog(dog)
      .then(() => toast.success(`created dog ${name}`))
      .finally(() => {
        setIsLoading(false);
      });
    refetchDogs();
    reset();
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        formSubmitHandler(e);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        id={name}
        type="text"
        value={name}
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        id="description"
        value={description}
        cols={80}
        rows={10}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
        onChange={(e) => setImage(e.target.value)}
        value={image}
        disabled={isLoading}
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
};
