import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import AppContainer from './navigator';

LogBox.ignoreAllLogs( );

export default function App() {
  return <>
    <StatusBar  barStyle="light-content" translucent={true} />
    <AppContainer/>
  </>;
}