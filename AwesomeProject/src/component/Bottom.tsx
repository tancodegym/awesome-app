/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import CoffeeScreen from './HotCoffee';
import CartScreen from './Cart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IceCoffee from './IceCoffee';

const Tab = createBottomTabNavigator();

function BottomTab(): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: 'rgba(255,0,0,0.6)',
      }}>
      <Tab.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Coffee Screen"
        component={CoffeeScreen}
        options={{
          tabBarLabel: 'Hot Coffee',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="fire" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Ice Coffee Screen"
        component={IceCoffee}
        options={{
          tabBarLabel: 'Ice Coffee',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="snowflake"
              color={color}
              size={size}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Animated Screen"
        component={AnimatedScreen}
        options={{
          tabBarLabel: 'Image',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="image" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Carousel Screen"
        component={CarouselScreen}
        options={{
          tabBarLabel: 'Carousel',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="television"
              color={color}
              size={size}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Cart Screen"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTab;
