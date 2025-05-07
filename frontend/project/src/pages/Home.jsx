import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import useProductStore from '../store/productStore';
import { Link } from 'react-router-dom';
import useCategoryStore from '../store/categoryStore';


const Home = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const { categories } = useCategoryStore();

  useEffect(() => {
    fetchProducts(); // Gọi API để lấy tất cả sản phẩm
  }, [fetchProducts]);
  console.log({ loading, error, products });

  if (loading) return <div className="text-center p-8">Đang tải...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto flex w-full">
        {/* Filter Sidebar */}
        <div className="w-1/4 pr-6">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
            <button className="ml-2 text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* By Category */}
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">By Category</h3>
            <ul className="space-y-2 text-gray-600">
              {categories.map((category)=>(<li><input type="checkbox" className="mr-2" /> {category.category_name}</li>)
              
              )}
            </ul>
          </div>
          {/* By Vendor */}
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">By Vendors</h3>
            <ul className="space-y-2 text-gray-600">
              <li><input type="checkbox" className="mr-2" /> Aldi</li>
              <li><input type="checkbox" className="mr-2" /> Adidas</li>
              <li><input type="checkbox" className="mr-2" /> Burbe</li>
              <li><input type="checkbox" className="mr-2" /> Chanel</li>
              <li><input type="checkbox" className="mr-2" /> Costco</li>
              <li><input type="checkbox" className="mr-2" /> Green Tea</li>
              <li><input type="checkbox" className="mr-2" /> Harris</li>
              <li><input type="checkbox" className="mr-2" /> iSnack</li>
              <li><input type="checkbox" className="mr-2" /> Kroger</li>
              <li><input type="checkbox" className="mr-2" /> Pambox</li>
              <li><input type="checkbox" className="mr-2" /> Prada</li>
              <li><input type="checkbox" className="mr-2" /> Targets</li>
              <li><input type="checkbox" className="mr-2" /> Trader</li>
            </ul>
          </div>
          {/* By Tags */}
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">By Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center">
                Milk <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
              </span>
              <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center">
                Broccoli <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
              </span>
              <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center">
                Smoothie <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
              </span>
              <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center">
                Fruit <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
              </span>
              <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center">
                Salad <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
              </span>
              <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center">
                Appetizer <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
              </span>
            </div>
          </div>
          {/* By Price */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700 mb-2">By Price</h3>
            <div className="flex items-center mb-3">
              <input type="text" placeholder="From: $5.00" className="w-1/2 p-2 border rounded-l-md" />
              <input type="text" placeholder="To: $1,000" className="w-1/2 p-2 border rounded-r-md" />
            </div>
            <ul className="space-y-2 text-gray-600">
              <li><input type="checkbox" className="mr-2" /> $0.00 - $20.00</li>
              <li><input type="checkbox" className="mr-2" /> $20.00 - $40.00</li>
              <li><input type="checkbox" className="mr-2" /> $40.00 - $80.00</li>
              <li><input type="checkbox" className="mr-2" /> $80.00 - $100.00</li>
              <li><input type="checkbox" className="mr-2" /> Over $100.00</li>
            </ul>
          </div>
        </div>
        {/* Product Grid */}
        <div className="w-3/4 pl-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">We found <span className="font-semibold">29 items</span> for you!</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <label className="mr-2 text-gray-600">Show:</label>
                <select className="border rounded-md p-1">
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="mr-2 text-gray-600">Sort by:</label>
                <select className="border rounded-md p-1">
                  <option>Featured</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link to={`/product/${product.slug}`}>
                <ProductCard key={product.id} product={product}/>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;