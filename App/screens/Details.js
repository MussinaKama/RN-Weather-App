import React from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { weatherApi } from "../util/weatherApi";

export default class extends React.Component {
  componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status !== "granted") {
          throw new Error("Permission to access location was denied");
        }
        return Location.getCurrentPositionAsync();
      })
      .then((position) => {
        console.log("position", position);
        this.getCurrentWeather({ coords: position.coords });
        this.getForecast({ coords: position.coords });
      });
  }

  getCurrentWeather = ({ zipcode, coords }) => {
    return weatherApi("/weather", { zipcode, coords })
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  getForecast = ({ zipcode, coords }) => {
    return weatherApi("/forecast", { zipcode, coords })
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  render() {
    return null;
  }
}
