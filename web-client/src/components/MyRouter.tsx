import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FishingLessons from './fishing-lessons/FishingLessons';
import Lodges from './lodges/Lodges';
import Login from './Login';
import Navbar from './navbar/Navbar';
import ReservationEntityDisplay from './reservation-entities/ReservationEntity';
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
        <Route path='/lodges'>
          <Lodges/>
        </Route>
        <Route path = '/reservationEntities/:id'>
          <ReservationEntityDisplay/>
        </Route>
      </Switch>
    </Router>
  );
};

export default MyRouter;
