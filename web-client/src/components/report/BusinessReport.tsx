import MonthlyReservationsGraph from "./MonthlyReservationsGraph";
import WeeklyReservationsGraph from "./WeeklyReservationsGraph";
import YearlyReservationsGraph from "./YearlyReservationsGraph";

const BusinessReport = () => {
    return (
        <div>
        <div className="float-left flex flex-row">
            <MonthlyReservationsGraph/>
            <YearlyReservationsGraph/>
        </div>
        <div className="float-left flex flex-row mt-12">
            <WeeklyReservationsGraph/>
        </div>
        </div>
        
    )
}

export default BusinessReport;