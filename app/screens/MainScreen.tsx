import React, { useCallback } from "react";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { MenuButtons } from "../components/MenuButtons";
import { MapSection } from "../sections/MapSection";
import { Ttheme } from "../themes";
import { useNavigation } from "@react-navigation/native";
import { MapStackNavigation } from "../types/navigationTypes";

export const MainScreen = () => {
  const navigation = useNavigation<MapStackNavigation>();

  const { theme, mapStyle } = useCustomThemeColors();
  const {
    map,
    contentContainer,
    linearGradient,
    container,
    profileButton,
    imageStyles,
  } = styles(theme);

  const onProfilePressHandler = useCallback(() => {
    navigation.navigate("profilePage");
  }, []);

  //   useSocketIo({ enabled: Boolean(userId), userId: userId! });

  return (
    <View style={container}>
      <TouchableOpacity
        onPress={onProfilePressHandler}
        style={profileButton}
      ></TouchableOpacity>

      <MapView showsUserLocation={true} customMapStyle={mapStyle} style={map} />
      <View style={contentContainer}>
        <LinearGradient
          colors={[theme.linearGradient, theme.pageColor]}
          style={linearGradient}
        />
        <MapSection />
        {/* <Text>Map Section</Text> */}
      </View>
      <MenuButtons />
    </View>
  );
};

// TODO: type styles
const styles = (theme: Ttheme) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: Dimensions.get("window").height,
      width: Dimensions.get("window").width,
      justifyContent: "flex-end",
      alignItems: "center",
      position: "relative",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    contentContainer: {
      height: Dimensions.get("window").height * 0.7,
      width: Dimensions.get("window").width,
      position: "absolute",
      bottom: 0,
      backgroundColor: theme.pageColor,
    },
    linearGradient: {
      width: Dimensions.get("window").width,
      height: 40,
      position: "absolute",
      top: -40,
    },
    profileButton: {
      width: 52,
      height: 52,
      borderRadius: 52,
      position: "absolute",
      top: 63,
      right: 24,
      zIndex: 999,
      backgroundColor: theme.profileButtonBg,
      justifyContent: "center",
      alignItems: "center",
    },
    imageStyles: {
      width: 42,
      height: 42,
      borderRadius: 42,
    },
  });
