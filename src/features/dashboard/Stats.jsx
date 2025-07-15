import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
function Stats({ booking, confirmedStays, numsDays, cabinCount }) {
  //1 nummber of boookings
  const numBooking = booking.length;

  //2 total sales
  const totalSales = booking.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //3 total checkin
  const totalCheckIns = confirmedStays.length;

  //4 occupancy rate = num checked in nights/ all available nights (num of days  * total cabins)
  const occupancy =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numsDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBooking}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="CheckIns"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckIns}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancy * 100)}%`}
      />
    </>
  );
}

export default Stats;
