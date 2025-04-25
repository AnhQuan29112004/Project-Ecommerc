const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 border-t">
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0 md:space-x-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">&copy; 2025 GreatKart</p>
          </div>
          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-6">
            <span className="text-sm text-gray-600">info@greatkart.io</span>
            <span className="text-sm text-gray-600">+879-332-9375</span>
            <span className="text-sm text-gray-600">Street name 123, Avenue abc</span>
          </div>
          <div className="flex space-x-4">
            <i className="bi bi-credit-card text-gray-600 text-xl"></i>
            <i className="bi bi-paypal text-gray-600 text-xl"></i>
            <i className="bi bi-credit-card-2-back text-gray-600 text-xl"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;