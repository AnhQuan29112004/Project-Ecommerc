import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import useCategoryStore from '../store/categoryStore';
import { useEffect, useState, useRef } from 'react';

const Header = () => {
  const { user, isAuthenticated, fetchUser, logout } = useAuthStore();
  const { categories, fetchCategories, loading: categoryLoading } = useCategoryStore();
  const { cartCount, fetchCartCount } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
      fetchCategories();
    }
    
  }, [isAuthenticated, fetchUser, fetchCategories]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/home/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/store?keyword=${searchQuery}`);
  };

  return (
    <header className="sticky top-0 bg-white border-b shadow-sm z-10">
      <div className="px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Logo and Menu Toggle */}
        <div className="flex items-center justify-between">
          <Link to="/home" className="text-2xl font-bold text-gray-800">
            GREATKART
          </Link>
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Navigation and Search */}
        <div
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto`}
        >
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-gray-600 hover:text-gray-800 flex items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Categories
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <Link
                    to="/categories"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    All Categories
                  </Link>
                  {categoryLoading ? (
                    <div className="px-4 py-2 text-gray-600">Đang tải...</div>
                  ) : (
                    categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.slug_category}`}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {category.category_name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
            <Link
              to="/store"
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Store
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex w-full md:w-auto">
            <input
              type="text"
              className="w-full md:w-64 px-3 py-1 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
              style={{ backgroundColor: 'white',
                color: 'black',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '4px', }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-3 py-1 rounded-r-lg hover:bg-blue-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* User and Cart */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-gray-600 text-sm">
              {user ? `Welcome ${user.data.username}` : 'Welcome guest'}
            </p>
            <div className="text-sm">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-600">Đã đăng nhập: </span>
                  <button
                    onClick={handleLogout}
                    className="text-blue-500 hover:underline"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/home/login" className="text-blue-500 hover:underline">
                    Sign in
                  </Link>
                  <span className="mx-2">|</span>
                  <Link to="/register" className="text-blue-500 hover:underline">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="relative">
            <Link to="/cart" className="text-gray-600 hover:text-gray-800">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {cartCount}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;