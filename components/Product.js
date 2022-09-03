import { ProductStyles } from '../styles/ProductStyle';
import Link from 'next/link';

const Product = ({ product }) => {
  const { title, description, price, image, slug } = product.attributes;
  return (
    <ProductStyles>
      <Link href={`/products/${slug}`}>
        <div>
          <img
            src={image.data.attributes.formats.small.url}
            alt={image.data.attributes.formats.small.name}
          />
        </div>
      </Link>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Price: SAR{price}</p>
    </ProductStyles>
  );
};

export default Product;
