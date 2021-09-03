import styled from "styled-components";
import ListingCard from "./boatDetails/ListingCard";

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

const MyBookingsCard = ({ myBooking }) => {
  const handleDate = (data) => {
    let date = data.split("-");
    date.push(date.shift());
    let properDate = date.join("/");
    return properDate;
  };

  return (
    <div>
      <h5>
        {handleDate(myBooking.date)} {myBooking.guests}
      </h5>

      <ListingCard boat={myBooking.boat} />
    </div>
  );
};

export default MyBookings;
