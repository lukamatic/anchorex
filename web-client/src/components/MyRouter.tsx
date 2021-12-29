import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FishingLessons from './fishing-lessons/FishingLessons';
import Lodges from './lodges/Lodges';
import Login from './Login';
import Navbar from './navbar/Navbar';
import ReservationEntityDisplay from './display-entity/ReservationEntity';
import ReservationEntityDisplayImages from './display-entity/ReservationEntityDisplayImages';
import ReservationEntityDisplayPricelist from './display-entity/ReservationEntityDisplayPricelist';
import ReservationEntityDisplayRules from './display-entity/ReservationEntityDisplayRules';
import Signup from './signup/Signup';
import SignupChoice from './signup/SignupChoice';
import Welcome from './Welcome';
import ReservationNewEntity from './reservation-entities/ReservationNewEntity';
import ReservationEntityAction from './display-entity/ReservationEntityAction';
import HomeScreen from './home/HomeScreen';
import ListScreen from './display-list/ListScreen';

const MyRouter = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path='/' exact>
					<HomeScreen />
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
				<Route path='/reservationEntities/:id'>
					<ReservationEntityDisplay />
				</Route>
				<Route path='/reservationEntitiesImages/:id'>
					<ReservationEntityDisplayImages />
				</Route>
				<Route path='/reservationEntitiesPriceList/:id'>
					<ReservationEntityDisplayPricelist />
				</Route>
				<Route path='/reservationEntitiesRules/:id'>
					<ReservationEntityDisplayRules />
				</Route>
				<Route path='/reservationNewEntity'>
					<ReservationNewEntity />
				</Route>
				<Route path='/reservationEntitiesAction/:id'>
					<ReservationEntityAction />
				</Route>
			</Switch>
		</Router>
	);
};

export default MyRouter;
