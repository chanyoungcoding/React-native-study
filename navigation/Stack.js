import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from 'react-native';

const ScreenOne = ({navigation}) => (
  <TouchableOpacity onPress={() => navigation.navigate("Two")}>
    <Text>One</Text>
  </TouchableOpacity>
)
const ScreenTwo = ({navigation: { navigate }}) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Two</Text>
  </TouchableOpacity>
)
const ScreenThree = ({navigation: { navigate }}) => (
  <TouchableOpacity onPress={() => navigate("Tabs", {screen: "Search"})}>
    <Text>Go Back</Text>
  </TouchableOpacity>
)

// setOptions
const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator screenOptions={{
      headerBackTitleVisible: false,
    }}>
      <NativeStack.Screen name='One' component={ScreenOne} />
      <NativeStack.Screen name='Two' component={ScreenTwo}/>
      <NativeStack.Screen name='Three' component={ScreenThree}/>
    </NativeStack.Navigator>
  )
}

export default Stack