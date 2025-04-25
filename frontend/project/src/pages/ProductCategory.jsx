import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(`/api/v1/category/${slug}/products/`); 
        const data = await response.json();
        setProducts(data.products || []);
        setCategoryName(data.category_name || slug);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [slug]);

  const handleDelete = async (productId) => {
    try {
      // Giả lập API xóa sản phẩm
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) return <div className="text-center p-8">Đang tải...</div>;

  return (
    <div className="container py-4">
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            {/* <ProductCard product={product} onDelete={handleDelete} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;