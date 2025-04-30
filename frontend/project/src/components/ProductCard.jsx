import useCartStore from '../store/cartStore';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product.id, 1); // Thêm 1 sản phẩm vào giỏ
  };

  return (
    <div className="card border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      {product.image && (
        <img
          src={product.image.includes('http://localhost:8000') ? product.image : `http://127.0.0.1:8000${product.image}`} 
          alt={product.product_name}
          className="card-img-top mb-3"
          style={{ maxHeight: '200px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <h3 className="card-title text-lg font-semibold">{product.product_name}</h3>
        <p className="text-gray-600">${product.new_price}</p>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="mt-2 space-x-2">
          <button
            className="btn btn-primary"
            onClick={() => window.location.href = `/product/${product.slug}`}
          >
            Xem
          </button>
          <button className="btn btn-success" onClick={handleAddToCart}>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;