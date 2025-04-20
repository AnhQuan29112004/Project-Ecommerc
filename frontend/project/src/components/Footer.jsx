const Footer = () => {
    return (
      <footer className="section-footer border-top py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-2">
              <p className="text-muted">© 2025 GreatKart</p>
            </div>
            <div className="col-md-8 text-center">
              <span className="px-2">info@greatkart.io</span>
              <span className="px-2">+879-332-9375</span>
              <span className="px-2">Street name 123, Avenue abc</span>
            </div>
            <div className="col-md-2 text-md-end text-muted">
              <i className="bi bi-credit-card fs-5 me-2"></i>
              <i className="bi bi-paypal fs-5 me-2"></i>
              <i className="bi bi-credit-card-2-back fs-5"></i>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;