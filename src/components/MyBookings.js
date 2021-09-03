import styled from "styled-components";
import MyBookingsCard from "./MyBookingCard";

const MyBookings = ({ myBookings, setMyBookings }) => {
  return (
    <Wrapper>
      <h1>My Bookings</h1>
      {myBookings.map((myBooking) => (
        <MyBookingsCard myBooking={myBooking} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  max-width: 65%;
`;

export default MyBookings;
