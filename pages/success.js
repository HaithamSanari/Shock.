import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
const { motion } = require('framer-motion');
import confirm from '../public/confirm-icon.svg';
import formatMoney from '../lib/formatMoney';

// STRIPE_SECRET_KEY
const stripe = require('stripe')(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ['line_items'],
    }
  );

  return { props: { order } };
}

export default function Success({ order }) {
  const route = useRouter();
  console.log(order);
  return (
    <Wrapper>
      <Card
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.75 } }}
        initial={{ opacity: 0, scale: 0.75 }}
      >
        <h1>Thank you for your order!</h1>
        <h2>A confirmation email has been sent to</h2>
        <h2>{order.customer_details.email}</h2>
        <InfoWrapper>
          <Address>
            <h3>Adress</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, val]) => (
                <p key={key}>
                  {key} : {val}
                </p>
              )
            )}
          </Address>
          <OrderInfo>
            <h3>Products</h3>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                <p>Product: {item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {formatMoney(item.price.unit_amount)}</p>
              </div>
            ))}
          </OrderInfo>
        </InfoWrapper>
        <p>Subtotal: {formatMoney(order.amount_subtotal)}</p>
        <p>Total Price: {formatMoney(order.amount_total)}</p>
        <button onClick={() => route.push('/')}>Continue Shopping</button>
        <Image src={confirm} alt='success' />
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0rem 25%;
  max-width: 100%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  @media (max-width: 767px) {
    margin: 0;
  }
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  background: white;
  border-radius: 2rem;
  padding: 3rem 3rem;
  h1 {
    color: var(--primary);
    margin-bottom: 1rem;
  }
  h2 {
    color: var(--secondary);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  button {
    background: var(--primary);
    color: white;
    font-weight: 500;
    font-size: 1.2rem;
    padding: 1rem 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  @media (max-width: 480px) {
    padding: 3rem 2rem;
  }
`;
const Address = styled.div`
  font-size: 1rem;
  width: 100%;
  /* margin-left: 3rem; */
`;
const OrderInfo = styled.div`
  font-size: 1rem;
  width: 100%;
  margin-left: 3rem;
  /* padding: 0 3rem; */
  div {
    padding-bottom: 1rem;
  }
`;
const InfoWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;
