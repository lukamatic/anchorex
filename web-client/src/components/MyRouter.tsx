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
import Ships from './ships/Ships';
import ShipDisplay from './display-ship/ShipDisplay';
import ShipDisplayRules from './display-ship/ShipDisplayRules';
import ShipDisplayPricelist from './display-ship/ShipDisplayPricelist';
import ShipDisplayKit from './display-ship/ShipDisplayKit';
import FishingLessonDisplay from './display-fishing-lesson/FishingLessonDisplay';
import FishingLessonDisplayImages from './display-fishing-lesson/FishingLessonDisplayImages';
import FishingLessonDisplayKit from './display-fishing-lesson/FishingLessonDisplayKit';
import FishingLessonDisplayRules from './display-fishing-lesson/FishingLessonDisplayRules';
import FishingLessonDisplayPricelist from './display-fishing-lesson/FishingLesssonDisplayPricelist';
import ReservationHistory from './reservation-entities/ReservationHistory';
import NewAdmin from './NewAdmin';
import Business from './Business';
import BusinessReport from './report/BusinessReport';
import LodgeCalendar from './display-lodge/LodgeCalendar';
import ShipAction from './display-ship/ShipAction';
import ShipCalendar from './display-ship/ShipCalendar';
import AdminFishingLessons from './admin-entities/AdminFishingLessons';
import AdminLodges from './admin-entities/AdminLodges';
import AdminShips from './admin-entities/AdminShips';
import FishingLessonAction from './display-fishing-lesson/FishingLessonAction';
import InstructorCalendar from './display-fishing-lesson/InstructorCalendar';
import ChangePasswordScreen from './profile/ChangePasswordScreen';
import ProfileScreen from './profile/ProfileScreen';
import AdminUsers from './admin-entities/AdminUsers';
import AdminReports from './admin-reports/AdminReports';

const MyRouter = () => (
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
        <Ships />
      </Route>
      <Route path='/ship/:id'>
        <ShipDisplay />
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
        <ShipDisplayPricelist />
      </Route>
      <Route path='/lodgeRules/:id'>
        <LodgeDisplayRules />
      </Route>
      <Route path='/shipRules/:id'>
        <ShipDisplayRules />
      </Route>
      <Route path='/lodgeAction/:id'>
        <LodgeAction />
      </Route>

      <Route path='/shipKit/:id'>
        <ShipDisplayKit />
      </Route>

      <Route path='/fishingLesson/:id'>
        <FishingLessonDisplay />
      </Route>
      <Route path='/fishingLessonImages/:id'>
        <FishingLessonDisplayImages />
      </Route>
      <Route path='/fishingLessonPriceList/:id'>
        <FishingLessonDisplayPricelist />
      </Route>
      <Route path='/fishingLessonRules/:id'>
        <FishingLessonDisplayRules />
      </Route>
      <Route path='/fishingLessonKit/:id'>
        <FishingLessonDisplayKit />
      </Route>

      <Route path='/reservationNewEntity'>
        <ReservationNewEntity />
      </Route>

      <Route path='/serviceSignupRequests'>
        <ServiceSignupRequests />
      </Route>

      <Route path='/reservations'>
        <ReservationHistory />
      </Route>

      <Route path='/newAdmin'>
        <NewAdmin />
      </Route>

      <Route path='/business'>
        <Business />
      </Route>

      <Route path='/lodgeCalendar/:id'>
        <LodgeCalendar />
      </Route>

      <Route path='/shipAction/:id'>
        <ShipAction />
      </Route>

      <Route path='/shipCalendar/:id'>
        <ShipCalendar />
      </Route>

      <Route path='/report'>
        <BusinessReport />
      </Route>

      <Route path='/adminUsers'>
        <AdminUsers />
      </Route>
      <Route path='/adminLodges'>
        <AdminLodges />
      </Route>
      <Route path='/adminShips'>
        <AdminShips />
      </Route>
      <Route path='/adminFishingLessons'>
        <AdminFishingLessons />
      </Route>
      <Route path='/adminReports'>
        <AdminReports />
      </Route>

      <Route path='/lodgeCalendar/:id'>
        <LodgeCalendar />
      </Route>

      <Route path='/shipAction/:id'>
        <ShipAction />
      </Route>

      <Route path='/shipCalendar/:id'>
        <ShipCalendar />
      </Route>

      <Route path='/instructorCalendar'>
        <InstructorCalendar />
      </Route>

      <Route path='/report'>
        <BusinessReport />
      </Route>

      <Route path='/fishingLessonAction/:id'>
        <FishingLessonAction />
      </Route>

      <Route path='/profile'>
        <ProfileScreen />
      </Route>
      <Route path='/changePassword'>
        <ChangePasswordScreen />
      </Route>
    </Switch>
  </Router>
);

export default MyRouter;
