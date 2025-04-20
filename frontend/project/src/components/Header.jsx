import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import useCategoryStore from '../store/categoryStore';
import { useEffect, useState } from 'react';

const Header = () => {
  const { user, isAuthenticated, fetchUser, logout } = useAuthStore();
  const { categories, fetchCategories, loading: categoryLoading } = useCategoryStore();
  const { cartCount, fetchCartCount } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
    fetchCategories();
  }, [isAuthenticated, fetchUser, fetchCategories]);

  const handleLogout = async () => {
    await logout();
    navigate('/home/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/store?keyword=${searchQuery}`);
  };

  return (
    <header className="section-header fixed-top bg-white border-bottom">
      <div className="container d-flex align-items-center flex-wrap py-3">
        <nav className="navbar navbar-expand-lg col-md-8">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold text-dark me-3" to="/home">
              GREATKART
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="shopDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="shopDropdown">
                    <li>
                      <Link className="dropdown-item" to="/categories">
                        All Categories
                      </Link>
                    </li>
                    {categoryLoading ? (
                      <li><span className="dropdown-item">Đang tải...</span></li>
                    ) : (
                      categories.map((category) => (
                        <li key={category.id}>
                          <Link
                            className="dropdown-item"
                            to={`/category/${category.slug_category}`}
                          >
                            {category.category_name}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/store">
                    Store
                  </Link>
                </li>
              </ul>
              <form className="d-flex flex-grow-1" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
          </div>
        </nav>
        <div className="d-flex align-items-center col-md-4 justify-content-end">
          <div className="me-3">
            <p className="text-muted small mb-1">
              {user ? `Welcome ${user.data.username}` : 'Welcome guest'}
            </p>
            <div>
              {isAuthenticated ? (
                <>
                  <span className="me-2">Đã đăng nhập: </span>
                  <button className="text-dark" onClick={handleLogout}>
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link className="text-dark me-2" to="/home/login">
                    Sign in
                  </Link>
                  |
                  <Link className="text-dark ms-2" to="/register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="position-relative">
            <Link to="/cart" className="text-dark">
              <i className="bi bi-cart fs-4"></i>
            </Link>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;