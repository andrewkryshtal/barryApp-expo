import React, { FC, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ttheme } from "../themes";
import { useCustomThemeColors } from "../hooks/useCustomThemeColors";
import { CustomTextInput } from "./CustomTextInput";
import { CustomButton, ButtonTypes } from "./CustomButton";
import { validateEmail } from "../helpers/misc";
import { apiService } from "../api/http";

export const SignupDrawerComponent: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const isDisabled =
      !name ||
      !email ||
      !password ||
      (!confirmPassword &&
        password !== confirmPassword &&
        validateEmail(email) !== null);
    setDisabled(isDisabled);
  }, [email, password, confirmPassword]);

  const onLoginHandler = useCallback(async () => {
    console.log({ name, email, password, confirmPassword });
    try {
      const data = await apiService.register({ name, email, password });
      console.log({ data });
    } catch (error: any) {
      console.log({ error });
    }
  }, [name, email, password, confirmPassword]);

  const { theme } = useCustomThemeColors();
  return (
    <>
      <View style={styles(theme).container}>
        <Text style={styles(theme).title}>Sign up</Text>
        <CustomTextInput
          label="Name"
          placeHolder="Mark Spencer"
          value={name}
          setValue={setName}
          useBottomSheet
        />
        <CustomTextInput
          label="E-mail"
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
        <CustomTextInput
          type="password"
          label="Confirm password"
          placeHolder="Type your email here"
          value={confirmPassword}
          setValue={setConfirmPassword}
          useBottomSheet
        />
        <CustomButton
          buttonText="Sign in with email"
          onPressHandler={onLoginHandler}
          disabled={disabled}
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
