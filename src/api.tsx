import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: () => {
    fetch(`${baseUrl}/dogs`)
      .then((data) => data.json())
      .then(console.log);
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: ({ name, image, description, isFavorite }: Dog) => {
    fetch(`${baseUrl}/dogs`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, image, description, isFavorite }),
    })
      .then((data) => data.json())
      .then(console.log);
  },

  // should delete a dog from the database
  deleteDog: (id: number) => {
    fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(console.log);
  },

  updateDog: (id: number, updatedDog: Partial<Dog>) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDog),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to update dog: ${response.status}`);
      }
      return response.json();
    });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
