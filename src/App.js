import logo from './logo.svg';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';

import './App.css';

function App() {
  return (    
    
  <Router>
    <Navbar/>
    <Routes>
      <Route exact path='/'  
        element= {
          <> 
            <Banner/> 
            <Movies /> 
          </>
        } 
      />
      <Route exact path='/favourites'
        element= {
          <>
            <Favourites />
          </>
        }
      />
    </Routes>
  </Router>
  );
}

export default App;
