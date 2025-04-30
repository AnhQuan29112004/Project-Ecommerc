import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import useProductStore from '../store/productStore';

const Home = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts(); // Gọi API để lấy tất cả sản phẩm
  }, [fetchProducts]);
  console.log({ loading, error, products });

  if (loading) return <div className="text-center p-8">Đang tải...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-4 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Sản phẩm nổi bật</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;