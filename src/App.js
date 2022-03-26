import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favourites from './components/Favourites';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
           <Route path='/' exact element={(
             <>
             <Banner/>
           <Movies/>
           </>
           )}/>
          <Route path='/fav' element={<Favourites />} />
        </Routes>

        {/* <Banner/>
    <Movies/>*/}
        {/* <Favourites/>  */}
      </Router>

    </>
  );
}

export default App;
