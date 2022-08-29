import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Basket from './components/Basket';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/basket' element={<Basket/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
