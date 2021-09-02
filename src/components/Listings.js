import styled from "styled-components";
import GoogleMap from "./GoogleMap";
// import Map from "./Map";
import ListingCard from "./boatDetails/ListingCard";

const Listings = ({ boats, search, setSearch }) => {
  return (
    <Container>
      <div>
        {boats.map((boat) => (
          <ListingCard boat={boat} />
        ))}
      </div>
      {/* <GoogleMap search={search} setSearch={setSearch} /> */}
      <div>map</div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

export default Listings;
