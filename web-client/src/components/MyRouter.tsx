import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Navbar from './navbar/Navbar';
import Signup from './Signup';
import Welcome from './Welcome';

const MyRouter = () => {
  return (
    <Router>
      <Navbar />
      <Route path='/' exact>
        <Welcome />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
    </Router>
  );
};

export default MyRouter;
