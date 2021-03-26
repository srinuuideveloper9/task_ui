import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import User from './containers/user';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/user" />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/admin">
            <User />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
