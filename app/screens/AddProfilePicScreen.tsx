import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { Ttheme } from "../themes";
import CameraIcon from "../media/svg/camera.svg";
import CocktailIcon from "../media/svg/cocktail.svg";
import { useTranslation } from "react-i18next";

export const AddProfilePicScreen = () => {
  const { t } = useTranslation();
  const { theme } = useCustomThemeColors();
  const [image, setImage] = useState<any | null>(null);

  const choosePhotoHandler = useCallback(async () => {
    // const result = await launchImageLibrary({
    //   mediaType: "photo",
    //   quality: 0.5,
    // });
    // if (result.assets) {
    //   setImage(result.assets[0]);
    // }
  }, []);

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).titleStyle}>Upload your photo</Text>
      <TouchableOpacity
        onPress={choosePhotoHandler}
        style={styles(theme).avaPlaceholder}
      >
        <View style={styles(theme).iconContainer}>
          <CameraIcon fill={theme.defaultTextColor} />
        </View>
        {image ? (
          <Image
            style={[
              styles(theme).avaPlaceholder,
              { position: "absolute", zIndex: -1 },
            ]}
            source={{ uri: image.uri }}
          />
        ) : (
          <CocktailIcon width="40" height="40" fill={theme.borderColor} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles(theme).buttonStyles}
        onPress={() => console.log("upload")}
      >
        <Text>{t("upload")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    titleStyle: {
      fontSize: 20,
      color: theme.defaultTextColor,
    },
    avaPlaceholder: {
      marginTop: 15,
      height: 120,
      width: 120,
      borderWidth: 1,
      borderRadius: 120,
      borderColor: theme.borderColor,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    iconContainer: {
      position: "absolute",
      right: 0,
      top: 0,
      width: 30,
      borderRadius: 30,
      height: 30,
      backgroundColor: theme.menuActiveColor,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonStyles: {
      width: 100,
      padding: 10,
      borderRadius: 20,
      backgroundColor: theme.menuActiveColor,
      color: theme.defaultTextColor,
      marginTop: 10,
      alignItems: "center",
    },
  });
