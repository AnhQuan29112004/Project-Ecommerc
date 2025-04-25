import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();  // Lấy location từ React Router
  const pathnames = location.pathname.split('/').filter((x) => x);  // Tách đường dẫn thành các phần

  return (
    <nav style={{ margin: '10px 0' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        Home
      </Link>
      {pathnames.length > 0 && ' / '}
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <span key={to}>
            <Link to={to} style={{ textDecoration: 'none', color: 'blue' }}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>
            {index < pathnames.length - 1 && ' / '}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
