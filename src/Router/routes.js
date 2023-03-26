import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../Components/Authentication/SignIn';
import SignUp from '../Components/Authentication/SignUp';
import DrawerSlide from '../Components/HomeScreen/Drawer';

import WelcomeScreen from '../Components/WelcomePage/WelcomePage';
const Stack = createStackNavigator();

function Routes() {
  return (
    <>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Home" component={DrawerSlide} options={{ title: 'Home Screen', headerShown: false ,detachPreviousScreen: false ,gestureEnabled: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'SignIn', headerShown: false ,gestureEnabled: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'SignUp', headerShown: false ,gestureEnabled: false}} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
          title: 'WelcomeScreen',
          headerShown: false ,
          gestureEnabled:false
          // Disable swipe back gesture on the WelcomeScreen
        }}
        />
      </Stack.Navigator>
    </>
  )
}

export default Routes