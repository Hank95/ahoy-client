import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const BoatDetails = () => {
  const [boatDetails, setBoatDetails] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const id = useParams().id;

  useEffect(() => {
    fetch(`/boats/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBoatDetails(data);
        setIsLoaded(true);
      });
  }, [id]);

  if (!isLoaded) return <h2>Loading...</h2>;

  return (
    <Container>
      <Title>
        <h1>{boatDetails.title}</h1>
        <h3>
          {boatDetails.year} {boatDetails.make}, {boatDetails.model}{" "}
        </h3>
      </Title>
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

export default BoatDetails;
