import styled from "styled-components";
import Stats from "./Stats";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import useCabin from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";
// import { useDarkMode } from "../../Context/DarkModeContext";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  // const { darkMode } = useDarkMode();
  const { isLoading, booking, numsDays } = useRecentBookings();
  const { isLoading: isStaying, confirmedStays } = useRecentStays();
  const { isLoading: isCabining, cabins } = useCabin();
  if (isLoading || isStaying || isCabining) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        booking={booking}
        confirmedStays={confirmedStays}
        numsDays={numsDays}
        cabinCount={cabins.length}
      />
      <Today />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart booking={booking} numsDays={numsDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
