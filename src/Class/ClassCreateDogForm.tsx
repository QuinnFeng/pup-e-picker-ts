import { Component } from "react";
import { dogPictures } from "../dog-pictures";

const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component {
  state = {
    name: "",
    description: "",
    image: defaultSelectedImage,
  };

  render() {
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          onChange={(e) => {
            this.setState({ name: e.target.value });
          }}
          disabled={false}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={(e) => {
            this.setState({ description: e.target.value });
          }}
          disabled={false}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          onChange={(e) => {
            console.log(e.target.value);
            this.setState({ image: e.target.value });
          }}
          disabled={false}
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
