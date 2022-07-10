import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Home from "./Home"
import ZoneManagement from './ZoneManagement';
import RegisterFood from './RegisterFood'
import SearchFood from './SearchFood'
import QuantityManagement from './QuantityManagement'
import ShoppingList from './ShoppingList';



class App extends React.Component {


  render() {

    return (
      <Router>
        <div className='App'>
          <div id='Sidebar'>
            <nav>
              <ul className='litems'>
                <li>
                  <Link to="/"> Home Page </Link>
                </li>
                <li>
                  <Link to="/zone"> Zone Management </Link>
                </li>
                <li>
                  <Link to="/register"> Register Food </Link>
                </li>
                <li>
                  <Link to="/search"> Food Search </Link>
                </li>
                {/* <li>
                  <Link to="/quantity"> Quantity Management </Link>
                </li> */}
                <Link to="/shopping"> Shopping List </Link>
              </ul>
            </nav>
          </div>

          <div className='containerdiv'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/zone" element={<ZoneManagement />} />
              <Route path="/register" element={<RegisterFood />} />
              <Route path="/search" element={<SearchFood />} />
              <Route path="/quantity/" element={<QuantityManagement />} />
              <Route path="/shopping" element={<ShoppingList />} />
            </Routes>
          </div>

        </div>
      </Router>

    );
  }

}

export default App;

