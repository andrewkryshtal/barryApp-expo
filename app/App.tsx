import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { themes } from "./themes";
import { Text, useColorScheme } from "react-native";
import { useAppSelector } from "./hooks/storeHooks";
import { isLoggedInSelector } from "./store/user/userSelectors";
import { LoginNavigator } from "./navigators/LoginNavigator";
import { MapNavigator } from "./navigators/MapNavigator";
import { useEffect } from "react";

export const App = () => {
  const loggedIn = useAppSelector(isLoggedInSelector);
  const scheme = useColorScheme();

  //   useEffect(() => {
  //     console.log("Logged In: ", loggedIn);
  //   }, [loggedIn]);

  return (
    <NavigationIndependentTree>
      <NavigationContainer
        theme={scheme === "light" ? themes.lightTheme : themes.darkTheme}
      >
        {!loggedIn ? <LoginNavigator /> : <MapNavigator />}
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};
