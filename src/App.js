import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import Header  from './components/Header';
import Main from './components/Main';
import SingleResult from './components/SingleResult';
function App() {
  return (
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
  );
}

export default App;
