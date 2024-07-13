import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductListScreen, ProfileScreen } from '../../screens';
import { RootNavigationList } from './RootNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name={RootNavigationList.PRODUCT} component={ProductListScreen} />
            <Tab.Screen name={RootNavigationList.PROFILE} component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
