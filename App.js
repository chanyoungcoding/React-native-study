import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useAssets } from 'expo-asset';

import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer} from '@react-navigation/native';
import Root from './navigation/Root';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from './styled';

SplashScreen.preventAutoHideAsync();


export default function App() {
  
  const [assets] = useAssets([require('./loginImage.webp')]);
  const [loaded] = Font.useFonts(Ionicons.font)

  const onLayoutRootView = useCallback(async () => {
    if (assets && loaded) await SplashScreen.hideAsync();
  }, [assets, loaded]);

  const isDark = useColorScheme() === "dark";

  if (!assets || !loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer onReady={onLayoutRootView}>
        <Root/>
      </NavigationContainer>
    </ThemeProvider>
  );
}

