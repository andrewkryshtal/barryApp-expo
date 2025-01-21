import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import VectorMain from "../media/svg/vectorMain.svg";
import VectorSlave from "../media/svg/vectorSlave.svg";
import { Ttheme } from "../themes";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { SigninDrawerComponent } from "../components/SigninDrawerComponent";
import { SignupDrawerComponent } from "../components/SignupDrawerComponent";

export const LoginScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const { theme } = useCustomThemeColors();
  const [authStage, setAuthStage] = useState<"signIn" | "signUp" | undefined>();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(
    () => (authStage === "signIn" ? ["65%"] : ["85%"]),
    [authStage]
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log("handleSheetChanges", index, authStage);
    },
    [authStage]
  );

  const onEmailSignInPress = useCallback(() => {
    setAuthStage("signIn");
    bottomSheetRef.current?.expand();
  }, []);

  const onEmailSignUpPress = useCallback(() => {
    setAuthStage("signUp");
    bottomSheetRef.current?.expand();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    <>
      <VectorMain width={windowWidth} />
      <VectorSlave style={styles(theme).vectorSlaveStyles} />
      <Text style={styles(theme).logoTitle}>Barifier.</Text>
      <View style={styles(theme).container}>
        <TouchableOpacity
          style={styles(theme).loginButton}
          onPress={onEmailSignInPress}
        >
          <View style={styles(theme).loginTextWrapper}>
            <Text style={styles(theme).loginText}>Sign in with email</Text>
          </View>
        </TouchableOpacity>
        <View style={styles(theme).signUpContainer}>
          <Text style={styles(theme).loginText}>Don’t have any account?</Text>
          <TouchableOpacity onPress={onEmailSignUpPress}>
            <Text style={styles(theme).loginText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        handleStyle={styles(theme).handle}
        keyboardBehavior="interactive"
      >
        <BottomSheetView style={styles(theme).contentContainer}>
          {authStage === "signIn" ? (
            <SigninDrawerComponent />
          ) : authStage === "signUp" ? (
            <SignupDrawerComponent />
          ) : null}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: "45%",
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
    },
    checkboxWrapper: {
      flexDirection: "row",
    },
    vectorSlaveStyles: {
      position: "absolute",
      right: 0,
      top: 200,
    },
    logoTitle: {
      fontFamily: "SFProDisplay-Bold",
      fontSize: 48,
      position: "absolute",
      top: "35%",
      left: 60,
      color: theme.defaultTextColor,
    },
    loginButton: {
      alignItems: "center",
      justifyContent: "center",
      width: "85%",
      height: 38,
      textAlign: "center",
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      margin: "auto",
      borderRadius: 50,
    },
    loginText: {
      fontFamily: "SFProDisplay-Medium",
      color: theme.defaultTextColor,
      marginRight: 5,
    },
    loginTextWrapper: {
      flexDirection: "row",
    },
    signUpContainer: {
      marginTop: "50%",
      flexDirection: "row",
      gap: 10,
    },
    handle: {
      backgroundColor: theme.pageColor,
    },
  });
