import MainPage from './components/MainPage';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <MainPage />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
