import styled from 'styled-components';
//Animation
const { motion } = require('framer-motion');

export const CartWrapper = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  /* display: none; */
`;

export const CartStyle = styled(motion.div)`
  max-width:100%;
  background: #f1f1f1;
  padding: 2rem 2rem;
  overflow-y: scroll;
  position: relative;
  @media (max-width: 480px) {
    width:80%;
  }
`;

export const Card = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  padding: 1rem;
  margin: 2rem 0rem;

  img {
    width: 8rem;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    gap: 2rem;
  }
  
`;

export const CardInfo = styled(motion.div)`
  width: 100%;
  padding-left: 2rem;
  div {
    display: flex;
    justify-content: space-between;
  }
  h3{
    font-size: clamp(.9rem, 2.5vw, 1rem);
  }
  @media (max-width: 767px) {
    padding-left: 0rem;
  }
`;

export const EmptyStyle = styled(motion.div)`
  /* For the empty cart */
  
  /*  */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  height: 100%;
  width: 100%;
  h1{
    font-size: clamp(1rem, 2.5vw, 2rem);
  }
  svg {
    font-size: 3rem;
    color: var(--secondary);
  }
`;

export const Checkout = styled(motion.div)`
  button {
    background: var(--primary);
    padding: 1rem 2rem;
    width: 100%;
    color: white;
    margin-top: 2rem;
    cursor: pointer;
  }
`;
