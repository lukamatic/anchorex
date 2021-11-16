import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FishingLessons from './fishing-lessons/FishingLessons';
import Login from './Login';
import Navbar from './navbar/Navbar';
import Signup from './signup/Signup';
import SignupChoice from './signup/SignupChoice';
import Welcome from './Welcome';

const MyRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <Welcome />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signupChoice'>
          <SignupChoice />
        </Route>
        <Route path='/signup/:choice'>
          <Signup />
        </Route>
        <Route path='/fishingLessons'>
          <FishingLessons />
        </Route>
      </Switch>
    </Router>
  );
};

export default MyRouter;
