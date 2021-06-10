import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Main from './screens/Main';
import { createStackNavigator } from '@react-navigation/stack';
import ImagePicker from './screens/ImagePicker';
import ImageEditor from './screens/ImageEditor'

export default function App() {

  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{
          headerTitle: "Fed Scanner",
          headerTitleAlign: "center",
        }} component={Main} />
        <Stack.Screen name="ImagePicker" component={ImagePicker} />
        <Stack.Screen name="ImageEditor" component={ImageEditor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
