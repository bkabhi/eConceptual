import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, ProductListScreen, ProfileScreen } from '../../screens';
import BottomTabNavigator from './BottomTabNavigator';

export enum RootNavigationList {
  PRODUCT = 'PRODUCT',
  PROFILE = 'PROFILE',
  LOGIN = 'LOGIN',
  MAIN = 'MAIN',
}

type RootNavigationParams = {
  [RootNavigationList.PRODUCT]: undefined;
  [RootNavigationList.PROFILE]: undefined;
  [RootNavigationList.LOGIN]: undefined;
  [RootNavigationList.MAIN]: undefined;
};

const RootStack = createStackNavigator<RootNavigationParams>();

type NavigationStackParams = StackNavigationProp<RootNavigationParams, RootNavigationList.LOGIN>;

export const RootNavigator = () => {
  const navigation = useNavigation<NavigationStackParams>();

  const navigateToProfile = useCallback(
    () => navigation.navigate(RootNavigationList.MAIN),
    [navigation],
  );

  const LoginScreenComponent = useCallback(
    () => <LoginScreen navigateToProfile={navigateToProfile} />,
    [navigateToProfile],
  );

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={RootNavigationList.LOGIN} component={LoginScreenComponent} />
      <RootStack.Screen name={RootNavigationList.MAIN} component={BottomTabNavigator} />
      {/* <RootStack.Screen name={RootNavigationList.PRODUCT} component={ProductListScreen} />
      <RootStack.Screen name={RootNavigationList.PROFILE} component={ProfileScreen} /> */}
    </RootStack.Navigator>
  );
};
