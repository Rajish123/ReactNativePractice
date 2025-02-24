import BottomTab from './src/components/navigation/BottomTab';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <SafeAreaProvider>
        <NavigationContainer>
          <BottomTab />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}