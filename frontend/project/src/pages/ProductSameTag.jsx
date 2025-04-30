import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getProductSameTag} from '../api/auth';
import ProductCard from '../components/ProductCard';

const ProductSameTag = () => {
  const { slug } = useParams();
  const [related, setRelated] = useState([]);
  useEffect(() => {
    const fetchRelated = async () => {
      const relatedProduct = await getProductSameTag(slug);
      setRelated(relatedProduct);
    };
    fetchRelated();
  }, [slug]);

  
  return (
    <div className="max-w-6xl mx-auto py-4 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Sản phẩm liên quan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </div>
  );
};

export default ProductSameTag;