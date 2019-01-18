import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App = ({ children }) => (
  <div>
    <Header />
    <div className='container-fluid'>
      <main>
        {children}
      </main>
    </div>
    <Footer />
  </div>
);

export default App;
