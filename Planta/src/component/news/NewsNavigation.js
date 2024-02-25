
import { View, Text, StyleSheet, Image,  } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Profile from './Screen/Profile';
import Explore from './Screen/Explore';
import Home from './Screen/Home';
import Notification from './Screen/Notification';
import Shopping from './Screen/Shopping';
import Category from './Screen/Category';
import Detail_Product from './Screen/Detail_Product';
import PlantPost from './Screen/PlantaPost';
import Detail_PlantaPost from './Screen/Detail_PlantaPost';
import CareAccessorie from './Screen/CareAccessories';
import Detail_CareAccessorie from './Screen/Detail_CareAccessories';
import Home2 from './Screen/Home2';
import DemoRedux from './Screen/DemoRedux';
import ProductInfo from './Screen/ProductInfo';
import MyCart from './Screen/MyCart';
import Planthandbook from './Screen/Planthandbook';
const Stack = createNativeStackNavigator()
const Bottom = createMaterialBottomTabNavigator()
const HomeStack = () => {
  return (
    <Stack.Navigator
    
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='Home' component={Home2}></Stack.Screen>
      <Stack.Screen name='Category' component={Category}></Stack.Screen>
      <Stack.Screen name='MyCart' component={MyCart}></Stack.Screen>
      <Stack.Screen name='ProductInfo' component={ProductInfo}></Stack.Screen>
       <Stack.Screen name='Shopping' component={Shopping}></Stack.Screen>
       <Stack.Screen name='PlantPost' component={PlantPost}></Stack.Screen>
       <Stack.Screen name='Detail' component={Detail_Product}></Stack.Screen>
       <Stack.Screen name='Detail_PlantaPost' component={Detail_PlantaPost}></Stack.Screen>
       <Stack.Screen name='CareAccessorie' component={CareAccessorie}></Stack.Screen>
       <Stack.Screen name='Detail_CareAccessorie' component={Detail_CareAccessorie}></Stack.Screen>
       <Stack.Screen name='Planthandbook' component={Planthandbook}></Stack.Screen>
    </Stack.Navigator>
  )
}
const NewsNavigation = () => {

  return (
    
      <Bottom.Navigator
        inactiveColor='#4E4B66'
        activeColor='#1877F2'
        screenOptions={{ headerShown: false , } 
      }

      >
        <Bottom.Screen  name='HomeStack' component={HomeStack} options={
          {
            tabBarLabel:'',
            tabBarIcon:({focused})=>(
              <MaterialCommunityIcons name={focused?"home":"home-outline"} color={!focused?'#4E4B66':'#1877F2'} size={26}/>
            )
          }
        }  >
        </Bottom.Screen>
        <Bottom.Screen name='Explore' component={Explore}
          options={
            {
              tabBarLabel:'',
              tabBarIcon:({focused})=>(
                <MaterialCommunityIcons name={focused?"compass":"compass-outline"} color={!focused?'#4E4B66':'#1877F2'} size={26}/>
              )
            }
          }
        ></Bottom.Screen>
        <Bottom.Screen name='Notification' component={Notification}
          options={
            {
              
              tabBarLabel:'',
              tabBarIcon:({focused})=>(
                <MaterialCommunityIcons name={focused?"bookmark":"bookmark-outline"} color={!focused?'#4E4B66':'#1877F2'} size={26}/>
              )
            }
          }
        ></Bottom.Screen>

        <Bottom.Screen name='Profile' component={Profile}
          options={
            {
              tabBarLabel:'',
              tabBarIcon:({focused,color})=>(
                <MaterialCommunityIcons name={focused?"account-circle":"account-circle-outline"} color={!focused?'#4E4B66':'#1877F2'} size={26}/>
              )
            }
          }
        ></Bottom.Screen>
      </Bottom.Navigator>
   

  )
}

export default NewsNavigation
const styles = StyleSheet.create({

})
