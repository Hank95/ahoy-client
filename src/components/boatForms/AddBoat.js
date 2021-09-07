import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Geocode from "react-geocode";
import BoatForm from "./BoatForm";

Geocode.setApiKey(process.env.REACT_APP_API_KEY);

const AddBoat = ({ myBoats, setMyBoats, boats, setBoats }) => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState(null);
  const [boatData, setBoatData] = useState({
    title: "",
    description: "",
    price: 50,
    make: "",
    model: "",
    year: 2020,
    length: 20,
    passengers: 4,
    crew: 0,
    bed: 0,
    sleep: 0,
    sailboat: "",
    fuel: 0,
    tender: false,
    alcohol: "",
    food: "",
    extras: "",
    location: "",
    lat: "",
    long: "",
  });

  // useEffect(() => {
  //   // Get latitude & longitude from address.
  //   Geocode.fromAddress(boatData.location).then(
  //     (response) => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       console.log(lat, lng);
  //       setBoatData({ ...boatData, lat: lat, long: lng });
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }, [boatData.location]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    Geocode.fromAddress(boatData.location)
      .then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          setBoatData({ ...boatData, lat: lat, long: lng });
        },
        (error) => {
          console.error(error);
        }
      )
      .then(
        fetch("/boats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(boatData),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((data) => {
              setBoats([...boats, data]);
              setMyBoats([...myBoats, data]);
            });
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        })
      );
  };

  function handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setBoatData({
      ...boatData,
      [name]: value,
    });
  }

  console.log(boatData);
  return (
    <Page>
      <Wrapper>
        <h2>Your Boat</h2>
        <h5>Please fill out this form to list your boat on AHOY!</h5>
        <Divider />
        <BoatForm
          boatData={boatData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors}
          isLoading={isLoading}
        />
      </Wrapper>
    </Page>
  );
};

const Page = styled.div`
  width: 100%;
  /* height: 100%; */
  position: absolute;
  z-index: -20;
  background-color: rgb(2, 65, 128);
`;
const Wrapper = styled.section`
  max-width: 400px;
  /* max-height: 75%;
  overflow: scroll; */
  margin: 10vh auto;
  padding: 16px;
  background-color: white;
  border-radius: 6px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0 16px 0;
`;

export default AddBoat;
