import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import Breadcrumb from './components/Breadscumb/Breadscrumb';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Breadcrumb />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;