import React, { FC, useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ttheme } from "../themes";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { CustomTextInput } from "./CustomTextInput";
import { CustomButton, ButtonTypes } from "./CustomButton";
import { apiService } from "../api/http";
import { useAppDispatch } from "../hooks/storeHooks";
import { loginAction } from "../store/user/userSlice";

export const SigninDrawerComponent: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const onLoginHandler = useCallback(async () => {
    try {
      const { token } = await apiService.login({ email, password });
      dispatch(loginAction({ token }));
    } catch (error: any) {
      throw new Error(error);
    }
  }, [email, password]);

  const { theme } = useCustomThemeColors();
  return (
    <>
      <View style={styles(theme).container}>
        <Text style={styles(theme).title}>Sign in</Text>
        <CustomTextInput
          label="Login"
          placeHolder="Type your email here"
          value={email}
          setValue={setEmail}
          useBottomSheet
        />
        <CustomTextInput
          type="password"
          label="Password"
          placeHolder="Type your email here"
          value={password}
          setValue={setPassword}
          useBottomSheet
        />
        <CustomButton
          buttonText="Sign in with email"
          onPressHandler={onLoginHandler}
          type={ButtonTypes.primary}
          containerStyles={{ width: "100%", marginTop: 30 }}
        />
      </View>
    </>
  );
};

const styles = (theme: Ttheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: theme.pageColor,
      padding: 58,
    },
    title: {
      color: theme.defaultTextColor,
      width: "100%",
      fontSize: 40,
      marginBottom: 60,
    },
  });
