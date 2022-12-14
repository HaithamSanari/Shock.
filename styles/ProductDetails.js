import styled from 'styled-components';

export const DetailsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    width: 40%;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    img {
      width: 50%;
    }
  }
  @media (max-width: 480px) {
    img {
      width: 80%;
    }
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  button {
    font-size: 1rem;
    font-weight: medium;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  @media (max-width: 767px) {
    width: 50%;
  }

  @media (max-width: 480px) {
    width: 80%;
  }
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;

  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
    cursor: pointer;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
  }

  svg {
    color: #494949;
  }
`;

export const Buy = styled.button`
  width: 100%;
  background: var(--primary);
  color: white;
  font-weight: 500;
`;
