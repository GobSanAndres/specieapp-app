import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";

import TestScreen from '../screens/TestScreen';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConfigurationScreen from '../screens/ConfigScreen';
import MaintainScreen from '../screens/MaintainScreen';
import LoginScreen from '../screens/LoginScreen';
import BaseScreen from '../screens/BaseScreen';
import { theme } from "../constants/theme";
import FormScreen from '../screens/FormScreen';
import SurveyVisual from '../screens/SurveyVisualScreen';
import SideMenu from '../components/SideMenu';
import ReportScreen from '../screens/ReportScreen';
import LocalScreen from '../screens/LocalScreen';
import LocalFormatScreen from '../screens/LocalFormatScreen';
import FishCategoryScreen from '../screens/FishCategoryScreen';
import LocalCategoryScreen from '../screens/LocalCategoryScreen';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();


const PublicStack = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen}  />
            <Stack.Screen name="Home" component={DrawerStack} />
            <Stack.Screen name="Maintain" component={MaintainScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="BaseScreen" component={BaseScreen} />
            <Stack.Screen name="FormScreen" component={FormScreen} />
            <Stack.Screen name="SurveyVisual" component={SurveyVisual} />
            <Stack.Screen name="FishCategory" component={FishCategoryScreen} />
            <Stack.Screen name="LocalCategory" component={LocalCategoryScreen} />

            <Stack.Screen name="Local" component={LocalScreen} />
            <Stack.Screen name="LocalFormat" component={LocalFormatScreen} />
        </Stack.Navigator>
    )
}

const DrawerStack = () => {
    return(
        <Drawer.Navigator 
            drawerContent={(props)=><SideMenu { ...props } />}
            screenOptions={{ 
                drawerStyle: { width: "50%", height: "30%", borderBottomLeftRadius: 12}, 
                headerShown: false, drawerPosition: 'right',
                overlayColor: 'rbga(3,3,3,0.4'
            }}>
            <Drawer.Screen name="HomeTab" component={PrivateStack} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Test" component={TestScreen} />
            <Drawer.Screen name="Configuration" component={ConfigurationScreen}/>
        </Drawer.Navigator>
    )
}

const PrivateStack = () => {
    const { idTheme } = useSelector(state => state);
    return(
        <Tab.Navigator  screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Storage') {
                iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme[idTheme].tab.active,
            tabBarInactiveTintColor: theme[idTheme].tab.noActive,
            headerShown: false
          })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Storage" component={ReportScreen} />
        </Tab.Navigator>
    )
}



const StackNavigation = () => {

    return(
        <NavigationContainer>
            <PublicStack />
        </NavigationContainer>
    )


}

export default StackNavigation;