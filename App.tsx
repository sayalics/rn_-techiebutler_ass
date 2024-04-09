// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostList from './src/screens/PostList';
import PostDetails from './src/screens/PostDetails';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PostList" component={PostList} options={{ title: 'Posts' }} />
        <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: 'Post Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;