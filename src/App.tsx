import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Home from "./modules/home";

const App = () => {
  console.log('Server running at: ', import.meta.env.VITE_GRAPHQL_SERVER_URL);
  const client = new ApolloClient({
    uri: `${import.meta.env.VITE_GRAPHQL_SERVER_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default App;
