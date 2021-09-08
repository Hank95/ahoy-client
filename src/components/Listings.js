import styled from "styled-components";
import Map from "./Map";
import ListingCard from "./boatDetails/ListingCard";
import SearchBar from "./SearchBar";

const Listings = ({ boats, search, setSearch }) => {
  return (
    <>
      <SearchBar setSearch={setSearch} />
      <Container>
        <div>
          {boats.map((boat) => (
            <ListingCard key={boat.id} boat={boat} />
          ))}
        </div>
        {/* <div>map</div> */}
        <Map search={search} boats={boats} />
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
