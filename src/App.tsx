import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Home from "./pages/home";

const App = () => {
  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default App;
