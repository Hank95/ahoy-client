import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Map from "./Map";
import ListingCard from "./boatDetails/ListingCard";
import SearchBar from "./SearchBar";

const Listings = ({ boats, search, setSearch }) => {
  const [mapBounds, setMapBounds] = useState({
    south: "",
    west: "",
    north: "",
    east: "",
  });
  const [boatsInBounds, setBoatsInBounds] = useState([]);
  console.log(boatsInBounds);
  console.log(boats);

  // useEffect(() => {
  //   fetch(
  //     `/bounds?min_lat=${mapBounds.south}&max_lat=${mapBounds.north}&min_lng=${mapBounds.west}&max_lng=${mapBounds.east}`
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setBoatsInBounds(json));
  // }, [mapBounds]);

  return (
    <>
      <SearchBar setSearch={setSearch} />
      <Container>
        <div>
          {boatsInBounds.map((boat) => (
            <ListingCard key={boat.id} boat={boat} />
          ))}
        </div>
        {/* <div>map</div> */}
        <Map
          search={search}
          boats={boatsInBounds}
          setBoatsInBounds={setBoatsInBounds}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

export default Listings;
