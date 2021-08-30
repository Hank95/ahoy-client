import styled from "styled-components";
import GoogleMap from "./GoogleMap";

const Listings = ({ boats, search, setSearch }) => {
  return (
    <Container>
      <div>Listings</div>
      <GoogleMap placeName={search} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

export default Listings;
