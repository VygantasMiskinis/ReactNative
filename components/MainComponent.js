import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';


const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={{ headerTitle: "Home"}}
            />            
        </HomeNavigator.Navigator>
    );
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorScreen() {
    return(
    <MainNavigator.Navigator  initialRouteName = 'Home' 
    drawerStyle={{ backgroundColor: '#D1C4E9'}}>
        
        <MainNavigator.Screen name='Home' component={HomeNavigatorScreen}  options={{ headerTitle: "Home"}, {label: "Menu"}}/>
        <MainNavigator.Screen name='Menu' component={MenuNavigatorScreen} options={{ headerTitle: "Menu"}, {label: "Menu"}}/>
    
    </MainNavigator.Navigator>
    );
}

class Main extends Component {

  render() {
 
    return (
        <NavigationContainer>
            <MainNavigatorScreen/>
                    
        </NavigationContainer>
    );
  }
}
  
export default Main;