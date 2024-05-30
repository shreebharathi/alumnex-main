import React from 'react';
import logo from './logo.jpeg'; // Adjust the path to where your logo image is stored
import './Home.css'; // Make sure this imports your CSS file where .cover-container is styled

const Home = () => {
  return (
    <div className="cover-container d-flex w-700 h-300 p-3 mx-auto flex-column">
      <header className="mb-auto">
        <div>
          <h3 className="float-md-start mb-0">
            <img src={logo} alt="Alumnex Forge Logo" height="150" />
          </h3>
        </div>
      </header>

      <main className="center-content">
        <h1>Welcome to Alumnex Forge</h1>
        <p className="lead">A platform for forging a connection between Alumni and their college community.</p>
        <p className="lead">
          
        </p>
      </main>

      <footer className="mt-auto text-white-50">
        
      </footer>
    </div>
  );
}

export default Home;
