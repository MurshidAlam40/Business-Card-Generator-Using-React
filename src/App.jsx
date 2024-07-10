
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import VisitingCard from './Components/VisitingCard';

function App() {

  return (
        <>
          <BrowserRouter>
                <Routes>
                    
                      <Route path='/' element={<Home/>} />
                      <Route path='vcard' element={<VisitingCard/>} />
                </Routes>
          </BrowserRouter>
        </>
  )
}

export default App
