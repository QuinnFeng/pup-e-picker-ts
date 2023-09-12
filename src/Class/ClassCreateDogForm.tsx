import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { Dog } from "../types";

const defaultSelectedImage = dogPictures.BlueHeeler;

const initialState = {
  name: "",
  description: "",
  image: defaultSelectedImage,
};

export class ClassCreateDogForm extends Component {
  state = { ...initialState };

  reset() {
    this.setState({ ...initialState });
  }

  formSubmitHandler() {
    const dog: Dog = { ...this.state, isFavorite: false };
    Requests.postDog(dog);
    alert(`created dog ${this.state.name}`);
    this.reset();
  }

  render() {
    const { name, description, image } = this.state;
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.formSubmitHandler();
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
          disabled={false}
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
          disabled={false}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          onChange={(e) => {
            this.setState({ image: e.target.value });
          }}
          disabled={false}
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
        <input type="submit" value="submit" disabled={false} />
      </form>
    );
  }
}
