import React from 'react';
import { StyleSheet} from 'react-native';
import Search from '../components/Search'
import Favorites from '../components/Favorites'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

class Navigation extends React.Component {

    render() {
        const Tab = createBottomTabNavigator();
        console.log("Navigation render");
        return (
            <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Search') {
                            iconName = focused
                                ? 'md-search'
                                : 'ios-search';
                        } else if (route.name === 'Favorites') {
                            iconName = focused ? 'ios-star' : 'ios-star-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}>
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Favorites" component={Favorites} />
            </Tab.Navigator>
        </NavigationContainer>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Navigation;