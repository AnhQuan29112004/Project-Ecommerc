import useCartStore from '../store/cartStore';
import { Rate } from 'antd';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product.id, 1); // Thêm 1 sản phẩm vào giỏ
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 w-59">
          {/* Discount Badge */}
          {product.percentage && (
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold rounded-tl-lg rounded-br-lg px-2 py-1">
              -{product.percentage}%
            </div>
          )}
          {/* Product Image */}
          {product.image && (
            <img
              src={product.image.includes('http://localhost:8000') ? product.image : `http://127.0.0.1:8000${product.image}`} 
              alt={product.product_name}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
          )}
          <div className="card-body">
            <p className="text-sm text-gray-500">Food</p>
            <h3 className="text-lg font-semibold text-gray-800">{product.product_name}</h3>
            <div className="flex items-center mt-1">
              <Rate allowHalf value={product.rating.average_rating}/>
              <span className="text-gray-500 text-sm ml-1">({product.rating.average_rating})</span>
            </div>
            <p className="text-gray-600 text-sm mt-1">by Nestlé</p>
            <p className="text-gray-900 font-semibold mt-2">${product.new_price}</p>
            <button
              className="mt-2 w-full bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
  );
};

export default ProductCard;