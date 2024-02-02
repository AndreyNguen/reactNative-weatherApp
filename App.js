import React from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import LoadingScreen from "./src/components/LoadingScreen";
import axios from "axios";
import WeatherCard from "./src/components/WeatherCard";

const API_KEY = "4718e28444257e083c94f01bb61ce957";

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({
      isLoading: false,
      temp,
      condition: weather[0].main,
    });
    console.log("data", { data: { main: { temp }, weather } });
  };

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Не удалось получить местоположение", "Очень грустно :(");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <LoadingScreen />
    ) : (
      <WeatherCard temp={Math.round(temp)} condition={condition} />
    );
  }
}
