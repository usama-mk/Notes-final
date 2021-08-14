import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import fetch from "cross-fetch";

// import TopBar from "./components/TopBar";
// import NotesContainer from "./components/NotesContainer";
// import AuthModal from "./components/AuthModal";
import UserProvider from "./context/user";
import NoteProvider from "./context/note";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Edit from "./Edit";
import './App.css'

const httpLink = createHttpLink({
  uri: "http://cms.demonetized.co/graphql",
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("notes_app_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions,
});

function App() {
  return (
    <div className="notegroup-app">

    
    <ApolloProvider  client={client}>
      <BrowserRouter>
        <UserProvider>
          <NoteProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/edit/:id" component={Edit} />
            </Switch>
          </NoteProvider>
        </UserProvider>
      </BrowserRouter>
    </ApolloProvider>
    </div> 
  );
}

export default App;
