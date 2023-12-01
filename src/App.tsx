import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Home from "./pages/home";

const App = () => {
  const client = new ApolloClient({
    uri: "https://event-management-backend-lime.vercel.app/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default App;
