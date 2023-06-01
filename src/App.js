import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";

window.process = {};

const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "ab2787f7c4044364b006f9d240d50949",
});

const IMAGE_URL = "https://samples.clarifai.com/metro-north.jpg";

const raw = JSON.stringify({
  user_app_id: {
    user_id: "clarifai",
    app_id: "main",
  },
  inputs: [
    {
      data: {
        image: {
          url: IMAGE_URL,
        },
      },
    },
  ],
});

const requestOptions = {
  method: "POST",
  headers: {
    Accept: "application/json",
    Authorization: "Key 2a60cb99907e423ba396e2e67cd66442",
  },
  body: raw,
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  };

  onButtonSubmit = () => {
    fetch(
      `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
      requestOptions
    )
      .then((response) => {
        response.text();
        console.log(response);
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    console.log("click");
  };

  render() {
    return (
      <div className="App">
        <Navigation />

        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        {/*<FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
