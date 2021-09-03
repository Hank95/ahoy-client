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

const MyBookingsCard = ({ myBooking }) => {
  const handleDate = (data) => {
    let date = data.split("-");
    date.push(date.shift());
    let properDate = date.join("/");
    return properDate;
  };

  return (
    <BookingCard>
      <Info>
        {handleDate(myBooking.date)}, {myBooking.guests} Guests
      </Info>

      <ListingCard boat={myBooking.boat} />
      <ActionButtons>
        <Button onClick={null}>Edit</Button>
        <Button onClick={null}>Cancel</Button>
      </ActionButtons>
    </BookingCard>
  );
};

const BookingCard = styled.div`
  background-color: rgb(221, 241, 251);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  margin: auto;
  max-width: 65%;
`;

const Info = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;
const Button = styled.button`
  cursor: pointer;
  font-size: 1.3rem;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 8px 16px;
  text-decoration: none;
  width: 100%;
  background-color: rgba(58, 142, 216, 1);
  display: flex;
  justify-content: center;
  align-self: center;
  a {
    color: inherit;
    text-decoration: none;
  }
`;
const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
`;
export default MyBookings;
