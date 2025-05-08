import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import useCategoryStore from '../store/categoryStore';
import { useEffect, useState, useRef } from 'react';
import qs from 'query-string'

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
    const searchParams = {
      keySearch: searchQuery,
    }
    navigate({
      pathname:``,
      search:`?${qs.stringify(searchParams)}`
  });

  };

  return (
    <header className="bg-white shadow-md">
      <nav className="">
        <div className="relative max-w-6xl mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/home" className="text-2xl font-bold text-gray-800">
              QanShop
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8 flex-1 justify-center">
            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-gray-600 hover:text-gray-900 flex items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Categories
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link
                    to="/categories"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    All Categories
                  </Link>
                  {categoryLoading ? (
                    <div className="px-4 py-2 text-gray-600">Loading...</div>
                  ) : (
                    categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/categories/${category.slug_category}`}
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

            <Link to="/store" className="text-gray-600 hover:text-gray-900">
              Store
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  className="w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search products..."
                  value={searchQuery}
                  style={{ backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid #ccc',
                    padding: '10px',
                    borderRadius: '4px', }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* User and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="text-sm">
                <p className="text-gray-600">
                  {user ? `Welcome ${user.data.username}` : 'Welcome guest'}
                </p>
                <div>
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Log out
                    </button>
                  ) : (
                    <div className="space-x-2">
                      <Link to="/home/login" className="text-blue-600 hover:text-blue-800">
                        Sign in
                      </Link>
                      <span>|</span>
                      <Link to="/register" className="text-blue-600 hover:text-blue-800">
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative">
              <Link to="/cart" className="text-gray-600 hover:text-gray-900">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/categories"
                className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Categories
              </Link>
              <Link
                to="/store"
                className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Store
              </Link>
              <div className="mt-4">
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    className="w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;