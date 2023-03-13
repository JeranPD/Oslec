import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 1rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .trackCustomer {
    display: flex;
    justify-content: center;
    margin-top: 5em;
  }

  @media (min-width: 992px) {
    .customer {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
  @media (min-width: 1024px) {
    .customer {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    
  }
`;
export default Wrapper;
