import React from 'react';
import './App.scss';
import Home from './Tournament/Home';

const App: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <Home />
      </div>
    </section>
  );
}

export default App;
