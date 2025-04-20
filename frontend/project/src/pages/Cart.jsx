import useCartStore from '../store/cartStore';
import { useEffect } from 'react';

const Cart = () => {
  const { cartItems, loading, error, fetchCart, removeItem } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) return <div className="text-center p-8">Đang tải...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="container py-4">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div key={item.id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.product.name}</h5>
                  <p className="card-text">Số lượng: {item.quantity}</p>
                  <p className="card-text">Giá: ${item.product.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeItem(item.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;