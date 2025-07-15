import styled from "styled-components";
const CabinSelector = styled.div`
  width: 70vw;
  margin-left: -4.8rem;
  margin-right: -4.8rem;
  overflow-x: auto;
  padding: 1rem 4.8rem;
  display: flex;
  gap: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;

  & > div {
    flex: 0 0 auto;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 8px;
  }

  & img {
    width: 150px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }

  & p {
    text-align: center;
    margin-top: 0.5rem;
    color: white; /* Optional: adapt to your theme */
  }
`;
const SelectedCabinDetail = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* p {
    color: #ccc;
    font-size: 1rem;
    line-height: 1.5;
    word-break: break-word;
  } */
  p {
    font-size: 14px;
    padding: 8px;
    background-color: var(--color-grey-400);
    border-radius: 10px;
  }
`;

function ImagePicker({ cabins, selectedCabinId, onSelectCabin }) {
  return (
    <CabinSelector>
      {cabins.map((cabin) => (
        <div
          key={cabin.id}
          onClick={() => onSelectCabin(cabin.id)}
          style={{
            border:
              cabin.id === selectedCabinId
                ? "3px solid #4f46e5"
                : "2px solid transparent",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <img
            src={cabin.image}
            alt={cabin.name}
            style={{
              width: "150px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <p style={{ textAlign: "center", marginTop: "0.5rem" }}>
            {cabin.name}
          </p>
          <SelectedCabinDetail>
            {cabin.description} <p>Max Capacity - {cabin.maxCapacity}</p>
          </SelectedCabinDetail>
        </div>
      ))}
    </CabinSelector>
  );
}

export default ImagePicker;
