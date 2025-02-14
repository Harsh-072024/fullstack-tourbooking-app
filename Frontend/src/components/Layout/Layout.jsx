import React from 'react';
import Header from '../Header/Header'; // Import Header component
import Routers from '../../router/Routers'; // Import Routers component
import Footer from '../Footer/Footer'; // Import Footer component

const Layout = () => {
  return (
    <div className="layout">
      <Header /> {/* Header component */}
      <Routers /> {/* Routes for the app */}
      <Footer /> {/* Footer component */}
    </div>
  );
}

export default Layout;
