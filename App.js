import BottomTab from './src/components/navigation/BottomTab';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductDetailScreen from './src/components/screens/ProductDetailScreen';

const queryClient = new QueryClient();
const Stack = createStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={ BottomTab }
              options={ { headerShown: false } }
            />
            <Stack.Screen
              name="ProductDetails"
              component={ ProductDetailScreen }
              options={ { title: 'Product Details' } }
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}