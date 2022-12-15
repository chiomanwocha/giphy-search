import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './components/Main';
import SingleResult from './components/SingleResult';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Main></Main>
            </Route>
            <Route path="/:id">
              <SingleResult></SingleResult>
            </Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
