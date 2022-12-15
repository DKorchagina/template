import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { MainSearch } from './components/Main/MainSearch';
import { Footer } from './components/Footer/Footer';
import './styles.css';

export function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/search' element={<MainSearch/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
 }

// export default App;
