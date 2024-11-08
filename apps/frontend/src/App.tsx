import { QueryClient, QueryClientProvider } from 'react-query';
import ChatRoom from './components/ChatRoom/ChatRoom';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChatRoom />
    </QueryClientProvider>
  );
};

export default App;
