import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const BoatDetails = ({ myBookings, setMyBookings, myBoats }) => {
  const [boatDetails, setBoatDetails] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookingDate, setBookingDate] = useState(0);
  const [passengers, setPassengers] = useState(0);
  const [booked, setBooked] = useState(false);

  const id = useParams().id;

  useEffect(() => {
    fetch(`/boats/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBoatDetails(data);
        setIsLoaded(true);
      });
  }, [id]);
  console.log(myBoats);
  console.log(boatDetails);

  const handleSubmit = (e) => {
    if (myBoats.includes(boatDetails)) {
      return alert("This is your boat");
    }
    e.preventDefault();
    fetch("/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: bookingDate,
        guests: passengers,
        boat_id: boatDetails.id,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setMyBookings([...myBookings, json]);
        setBooked(true);
      });
  };

  // const handleChange = (event) => {
  //   setBookingDetails({
  //     ...bookingDetails,
  //     [event.target.name]: [event.target.value],
  //   });
  // };
  console.log(bookingDate);

  if (!isLoaded) return <h2>Loading...</h2>;

  return (
    <Container>
      <Title>
        <h1>{boatDetails.title}</h1>
        <h3>
          {boatDetails.year} {boatDetails.make}, {boatDetails.model}
        </h3>
      </Title>
      <Images>Pictures of boat</Images>
      <Details>
        <Description>
          <h3>
            Hosted by: {boatDetails.user.username}, location:
            {boatDetails.location}
          </h3>
          <h3>Description:</h3>
          <p>{boatDetails.description}</p>
          <p>{boatDetails.extras}</p>
        </Description>
        <Booking>
          <div>
            <h3>Booking</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <FormField>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label for="guests">Number of Guest</Label>
              <Input
                type="number"
                name="guests"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
              />
            </FormField>
            <FormField>
              {booked ? (
                <>
                  <div>
                    {boatDetails.title} has been booked for {bookingDate}!
                  </div>
                  <div>Please check you bookings for further details.</div>
                </>
              ) : (
                <Button type="submit">Send Request</Button>
              )}
            </FormField>
          </form>
        </Booking>
      </Details>
      <h2> Specifications:</h2>

      <Specifications>
        <GridItem> Make: {boatDetails.make}</GridItem>
        <GridItem> Model: {boatDetails.model}</GridItem>
        <GridItem> Location: {boatDetails.location}</GridItem>
        <GridItem> Length: {boatDetails["length"]}</GridItem>
        <GridItem> Year: {boatDetails.year}</GridItem>
        <GridItem> Max {boatDetails.passengers} passengers</GridItem>
        {boatDetails.sailboat ? (
          <GridItem>Boat Type: Sailboat</GridItem>
        ) : (
          <GridItem>Boat Type: Powerboat</GridItem>
        )}
        {boatDetails.bed ? <GridItem> {boatDetails.bed} beds</GridItem> : null}
        {boatDetails.sleep ? (
          <GridItem>Sleeps {boatDetails.sleep}</GridItem>
        ) : null}
      </Specifications>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  max-width: 80%;
`;
const Title = styled.div`
  border-bottom: 3px solid black;
`;
const Images = styled.div`
  width: 100%;
  height: 500px;
  border-bottom: 3px solid black;
`;
const Details = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  border-bottom: 3px solid black;
`;
const Description = styled.div`
  padding: 15px;
`;
const Booking = styled.div`
  padding: 15px;
`;
const Specifications = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  margin: auto;
`;
const GridItem = styled.div`
  padding: 15px;
`;
const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 30px;
`;

const Label = styled.label`
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 8px;
`;
const Input = styled.input`
  border-radius: 6px;
  border: 1px solid transparent;
  border-color: #dbdbdb;
  -webkit-appearance: none;
  max-width: 100%;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
  padding: 4px;
`;

const Button = styled.button`
  cursor: pointer;
  font-size: 1.3rem;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 8px 16px;
  text-decoration: none;
  width: 100%;
  background-color: rgb(58, 142, 216);
  display: flex;
  justify-content: center;
  align-self: center;
  a {
    color: inherit;
    text-decoration: none;
  }
`;
export default BoatDetails;
