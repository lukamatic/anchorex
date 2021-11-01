import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Welcome from './components/Welcome';

function App() {
  return (
    <Router>
      <Route path='/' exact>
        <Welcome />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
    </Router>
  );
}

export default App;
