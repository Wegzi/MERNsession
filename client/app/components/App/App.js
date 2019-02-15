import React, { Component } from 'react';

const App = ({ children }) => (
  <div>
    <div className='container-fluid'>
      <main>
        {children}
      </main>
    </div>
  </div>
);

export default App;
