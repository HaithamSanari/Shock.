import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';
import { NavStyles, NavItems } from '../styles/NavStyles';
import Cart from './Cart';
import { useStateContext } from '../lib/context';
import User from './User';
const { AnimatePresence, motion } = require('framer-motion');

export default function Nav() {
  const { showCart, setShowCart, totalQuantity } = useStateContext();
  return (
    <NavStyles>
      <Link href={'/'}>Shock.</Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalQuantity > 0 && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
              {totalQuantity}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
}
