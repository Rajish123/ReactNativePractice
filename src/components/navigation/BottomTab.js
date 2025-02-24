import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import CartScreen from "../screens/CartScreen";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={ ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Category') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Cart') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } 
                    return <Ionicons name={ iconName } size={ size } color={ color } />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            }) }
        >
            <Tab.Screen name="Home" component={ HomeScreen } />
            <Tab.Screen name="Category" component={ CategoryScreen } />
            <Tab.Screen name="Cart" component={ CartScreen } />
        </Tab.Navigator>
    );
}

export default BottomTab
