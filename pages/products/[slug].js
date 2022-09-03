import { useQuery } from 'urql';
import { useRouter } from 'next/router';
import { GET_PRODUCT_QUERY } from '../../lib/query';
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from '../../styles/ProductDetails';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useStateContext } from '../../lib/context';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const ProductDetails = () => {
  //Use state
  const { increaseQty, decreaseQty, quantity, onAdd, setQuantity } =
    useStateContext();

  useEffect(() => {
    setQuantity(1);
  }, []);
  // Fetch Slug
  const { query } = useRouter();
  // console.log(query);

  // Fetch Graphql data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;

  // Check for the data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.. {error.message}</p>;
  // Extract Data
  const { title, description, price, image } = data.products.data[0].attributes;

  // Create Toast
  const notify = () => {
    toast.success(`${title} added to your cart.`, {
      duration: 1500,
    });
  };
  return (
    <DetailsStyle>
      <img
        src={image.data.attributes.formats.medium.url}
        alt={image.data.attributes.formats.medium.name}
      />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>

        <Quantity>
          <span>{price}</span>
          <button onClick={decreaseQty}>
            <AiFillMinusCircle />
          </button>
          <p>{quantity}</p>
          <button onClick={increaseQty}>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, quantity);
            notify();
          }}
        >
          Add to Cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
};

export default ProductDetails;
