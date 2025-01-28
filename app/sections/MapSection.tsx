import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// import Geolocation, {
// GeolocationResponse,
// } from "@react-native-community/geolocation";
import * as Location from "expo-location";
import Geocoder, { GeocodingObject } from "react-native-geocoder-reborn";

import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { Ttheme } from "../themes";

import { getAllBars, getWeather, IweatherJSON } from "../api/backendApi";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../store/core/coreSelectors";
// @ts-ignore
import ChatIcon from "../media/svg/chatIcon.svg";
import { useNavigation } from "@react-navigation/native";
import { MapStackNavigation } from "../types/navigationTypes";
import { useDispatch, useSelector } from "react-redux";
import { addGoogleFoundBars } from "../store/bars/barsActions";
import { IGoogleBarInterface } from "../store/bars/barsTypes";
import { FlashList } from "@shopify/flash-list";
import { BarCard } from "../components/BarCard";
import { RootState } from "../store/index";

export const MapSection = () => {
  const navigation = useNavigation<MapStackNavigation>();
  const dispatch = useDispatch();

  const { theme } = useCustomThemeColors();
  const localization = useLocalization();

  const [currentPosition, setCurrentPosition] =
    useState<Location.LocationObject | null>(null);
  const [weatherState, setWeatherState] = useState<IweatherJSON | null>(null);
  const [result, setResult] = useState<null | GeocodingObject[]>(null);
  const [gotPositionFlag, setGotPositionFlag] = useState(false);

  //   useEffect(() => {
  //     (async () => {
  //       const bars = await getAllBars();
  //       dispatch(addGoogleFoundBars(bars));
  //     })();
  //     // Geolocation.getCurrentPosition(setCurrentPosition);
  //   }, []);

  useEffect(() => {
    getBars();
    getLocation();
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [currentPosition]);

  const getBars = async () => {
    await getAllBars().then((res) => {
      dispatch(addGoogleFoundBars(res));
    });
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        console.log("Permission to access location was denied");
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCurrentPosition(position);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const getWeatherData = async () => {
    if (currentPosition !== null && !gotPositionFlag) {
      const { longitude, latitude } = currentPosition.coords;

      try {
        const result = await Geocoder.geocodePosition({
          lat: latitude,
          lng: longitude,
        });
        setGotPositionFlag(true);
        setResult(result);

        //     const weather = await getWeather({
        //       city: result[0]?.adminArea,
        //       language: localization,
        //     });
        //     setWeatherState(weather);
      } catch (e) {
        console.log({ e });
      }
    }
  };

  const onChatsPressHandler = useCallback(() => {
    navigation.navigate("Chats");
  }, []);

  const allGoogleBars = useSelector<RootState, IGoogleBarInterface[]>(
    ({ bars }) => bars.googleBars
  );

  return (
    <View style={styles(theme).wrapperStyles}>
      <View style={styles(theme).itemsWrapper}>
        <View>
          {result !== null && (
            <Text style={styles(theme).textStyle}>
              {result[0]?.adminArea}, {result[0]?.country}
            </Text>
          )}
          {weatherState !== null && (
            <Text style={styles(theme).weatherTextStyle}>
              {weatherState.description}, {weatherState.temp} ℃
            </Text>
          )}
        </View>
        <View>
          <TouchableOpacity
            style={styles(theme).circle}
            onPress={onChatsPressHandler}
          >
            <ChatIcon style={styles(theme).chatIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles(theme).barsContainer}>
        {allGoogleBars.length !== 0 && (
          <FlashList
            data={allGoogleBars}
            renderItem={({ item }) => (
              <BarCard bar={item} currentPosition={currentPosition} />
            )}
            estimatedItemSize={335}
          />
        )}
      </View>
    </View>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    wrapperStyles: {
      overflow: "visible",
      // marginHorizontal: 24,
    },
    itemsWrapper: {
      marginHorizontal: 24,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textStyle: {
      color: theme.defaultTextColor,
      fontFamily: "SFProDisplay-Bold",
      fontSize: 24,
    },
    weatherTextStyle: {
      fontFamily: "SFProDisplay-Medium",
      fontSize: 12,
      color: theme.lightTextColor,
      textTransform: "capitalize",
    },
    circle: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 100,
      padding: 23,
    },
    chatIcon: {
      // @ts-ignore
      fill: theme.defaultTextColor,
    },
    barsContainer: {
      overflow: "visible",
      height: "82%",
      // width: "100%",
    },
  });
