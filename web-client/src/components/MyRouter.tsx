import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FishingLessons from './fishing-lessons/FishingLessons';
import Lodges from './display-lodge/Lodges';
import Login from './login/Login';
import Navbar from './navbar/Navbar';
import LodgeDisplay from './display-lodge/LodgeDisplay';
import LodgeDisplayImages from './display-lodge/LodgeDisplayImages';
import LodgeDisplayPricelist from './display-lodge/LodgeDisplayPricelist';
import LodgeDisplayRules from './display-lodge/LodgeDisplayRules';
import Signup from './signup/Signup';
import SignupChoice from './signup/SignupChoice';
import ReservationNewEntity from './reservation-entities/ReservationNewEntity';
import LodgeAction from './display-lodge/LodgeAction';
import HomeScreen from './home/HomeScreen';
import ListScreen from './display-list/ListScreen';
import Verification from './login/Verification';
import ServiceSignupRequests from './service-signup-requests/ServiceSignupRequests';
import ShipDisplay from './display-ship/ShipDisplay';
import ShipDisplayRules from './display-ship/ShipDisplayRules';
import ShipDisplayPricelist from './display-ship/ShipDisplayPricelist';
import ShipDisplayKit from './display-ship/ShipDisplayKit';
import LodgeCalendar from './display-lodge/LodgeCalendar';
import Ships from './display-ship/Ships';
import ShipCalendar from './display-ship/ShipCalendar';

const MyRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <HomeScreen />
        </Route>
        <Route path='/verification'>
          <Verification />
        </Route>
        <Route path='/listScreen/:type'>
          <ListScreen />
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
          <Lodges />
        </Route>
        <Route path='/ships'>
          <Ships/>
        </Route>
        <Route path='/ship/:id'>
        <ShipDisplay/>
        </Route>
        <Route path='/lodge/:id'>
          <LodgeDisplay />
        </Route>
        <Route path='/lodgeImages/:id'>
          <LodgeDisplayImages />
        </Route>
        <Route path='/lodgePriceList/:id'>
          <LodgeDisplayPricelist />
        </Route>
        <Route path='/shipPriceList/:id'>
          <ShipDisplayPricelist/>
        </Route>
        <Route path='/lodgeRules/:id'>
          <LodgeDisplayRules />
        </Route>
        <Route path='/shipRules/:id'>
          <ShipDisplayRules/>
        </Route>
        <Route path='/lodgeAction/:id'>
          <LodgeAction />
        </Route>

        <Route path='/lodgeCalendar/:id'>
          <LodgeCalendar/>
        </Route>

        <Route path='/shipCalendar/:id'>
          <ShipCalendar/>
        </Route>

        <Route path='/shipKit/:id'>
          <ShipDisplayKit/>
        </Route>
        
        <Route path='/reservationNewEntity'>
          <ReservationNewEntity />
        </Route>
        
        <Route path='/serviceSignupRequests'>
          <ServiceSignupRequests />
        </Route>
      </Switch>
    </Router>
  );
};

export default MyRouter;
