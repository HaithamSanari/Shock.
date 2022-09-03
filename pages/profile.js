import { useRouter } from 'next/router';
// Specify Stripe secret api key here
const stripe = require('stripe')(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import styled from 'styled-components';
import formatMoney from "../lib/formatMoney";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    // access the user session
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    return { props: { orders: paymentIntents.data } };
  },
});

export default function Profile({ user, orders }) {
  const route = useRouter();
  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          {orders.map((order) => (
            <Order key={order.id}>
              <div>
                <h1>
                  <span>Order Number: </span> {order.id}
                </h1>
              </div>
              <div>
                <h1>
                  <span>Amount: </span> {formatMoney(order.amount)}
                </h1>
              </div>
              <div>
                <h1>
                  <span>Receipt Email: </span> {user.email}
                </h1>
              </div>
            </Order>
          ))}
        </div>
        <Logout onClick={() => route.push('/api/auth/logout')}>Log out</Logout>
      </div>
    )
  );
}

const Order = styled.div`
  background: white;
  margin: 2rem 0rem;
  padding: 3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 1rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  h2 {
    font-size: 1rem;
    color: var(--secondary);
  }
`;
const Logout = styled.div`
  background: #ff4742;
  border: 1px solid #ff4742;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, 'proxima nova', sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  margin-bottom: 1rem;

  &:hover,
  &:active {
    background-color: initial;
    background-position: 0 0;
    color: #ff4742;
  }

  &:active {
    opacity: 0.5;
  }
`;
