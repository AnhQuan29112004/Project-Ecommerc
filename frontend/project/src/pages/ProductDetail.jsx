import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productDetail from '../store/productDetail';
import ProductDetails from '../components/ProductDetail/DetailProduct';
import ProductImages from '../components/ProductDetail/ProductImage';
import VendorInfo from '../components/ProductDetail/VendorInfo';
import RelatedProduct from '../components/ProductDetail/RelatedProducts';

const ProductDetail = () => {
  const { slug } = useParams();
  const { fetchDetailProduct, loading, error, detail: product } = productDetail();

  useEffect(() => {
    fetchDetailProduct(slug);
  }, [slug, fetchDetailProduct]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-red-600">Product not found</div>
      </div>
    );
  }
  console.log("Product Vendor",product.vendor);
  const relatedProduct = product.relatedProduct || []; 

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductImages productImage={product.image} />
        <ProductDetails productDetail={product}/>
        <VendorInfo vendorDetail={product.vendor}/>
      </div>
      <div className="mt-8"> {/* Thêm margin-top để tạo khoảng cách với các phần trên */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedProduct.map((product) => (
            <RelatedProduct key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;