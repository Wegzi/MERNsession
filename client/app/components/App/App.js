import React, { Component } from 'react';

const App = ({ children }) => (
  <div>
    <div className='container-fluid m-0 p-0'>
      <main>
        {children}
      </main>
    </div>
  </div>
);

export default App;
