import { Link, useNavigate } from 'react-router-dom';
import vendorList from '../store/vendorStore';
import { useEffect, useState, useRef } from 'react';

const vendors = () => {
    const { vendorData, loading, error, fetchVendor, vendorCount } = vendorList();
  
    useEffect(() => {
      fetchVendor(); // Gọi API để lấy tất cả sản phẩm
    }, [fetchVendor]);
    console.log({ loading, error, products });
  
    if (loading) return <div className="text-center p-8">Đang tải...</div>;
    if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  
    return (
      <div className="max-w-6xl mx-auto py-4 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Sản phẩm nổi bật</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vendorData.map((vendor) => (
            <ProductCard key={product.id} product={product} onDelete={deleteProduct} />
          ))}
        </div>
      </div>
    );
  };
  
  export default vendors;