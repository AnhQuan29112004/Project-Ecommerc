import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productDetail from '../store/productDetail';
import ProductDetails from '../components/ProductDetail/DetailProduct';
import ProductImages from '../components/ProductDetail/ProductImage';
import VendorInfo from '../components/ProductDetail/VendorInfo';
import RelatedProduct from '../components/ProductDetail/RelatedProducts';
import RatingProduct from '../components/ProductDetail/RatingProduct';

const ProductDetail = () => {
  const tabs = ['Description', 'Reviews'];
  const [activeTab, setActiveTab] = useState('Description');
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
  console.log("Product Slug",product.slug);
  const relatedProduct = product.relatedProduct || []; 
  const tabContent = {
    Description: (
      product.description || 'No description available'
    ),
    Reviews:(
    <RatingProduct productSlug={product.slug} productRating={product.rating}/>
    ),
  }
  // console.log("Product Rating",tabContent["Review"]);
  console.log("Product Rating",product.rating);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className='md:w-3/4 flex flex-col gap-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className=''>
              <ProductImages productImage={product.image} />
            </div>
            <div className=''>
              <ProductDetails productDetail={product}/>
            </div>
          </div>


          <div className="lg:flex-[3] min-w-0">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-4 p-6 bg-white rounded-lg shadow-sm">
            {tabContent[activeTab]}
          </div>
        </div>
        </div>
        <div className='md:w-1/3'>
        <VendorInfo vendorDetail={product.vendor}/>
        </div>
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