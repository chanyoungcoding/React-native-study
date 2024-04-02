import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

import { BLACK_COLOR, YELLOW_COLOR } from '../colors';
import Movie from '../screens/Movie';
import Tv from '../screens/Tv';
import Search from '../screens/Search';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  const allNavOptions = {
    headerTitleStyle: {color: "orange"},
    tabBarStyle: { backgroundColor: isDark ? "#1e272e" : "white" },
    tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
    tabBarInactiveTintColor: isDark ? "#d2dae2" : "#808e9b",
    headerStyle: {
      backgroundColor: isDark ? BLACK_COLOR : "white"
    },
    headerTitleStyle: {
      color: isDark ? "#ffa801" : BLACK_COLOR,
    },
    tabBarLabelStyle: {
      marginTop: -5,
      fontSize: 12,
      fontWeight: "600"
    }
  }

  return (
    <Tab.Navigator initialRouteName='Movies' screenOptions={allNavOptions}
    >
      <Tab.Screen 
        name='Movies' 
        component={Movie}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name={focused ? "film" : "film-outline"} color={color} size={size}/>
          }
        }}
      />
      <Tab.Screen 
        name='TV' 
        component={Tv}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name={focused ? "tv" : "tv-outline"} color={color} size={size}/>
          }
        }}
      />
      <Tab.Screen 
        name='Search' 
        component={Search} 
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name={focused ? "search" : "search-outline"} color={color} size={size}/>
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs