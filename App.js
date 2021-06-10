import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Main from './screens/Main';
import { createStackNavigator } from '@react-navigation/stack';
import ImagePicker from './screens/ImagePicker';
import CameraScreen from './screens/CameraScreen';
import CameraEditor from './screens/CameraEditor';


export default function App() {

  const Stack = createStackNavigator()

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{
            headerShown: false,
            headerStyle: {
              borderWidth: 0,
              elevation: 2
            }
          }} component={Main} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} options={{
            title: "Add Images"
          }}/>
          <Stack.Screen name="ImagePicker" component={ImagePicker} options={{
            title: "Select Images"
          }} />
          <Stack.Screen name="CameraEditor" component={CameraEditor} options={{title: "Edit Images"}}/>
          
        </Stack.Navigator>
      </NavigationContainer>
  );
}
