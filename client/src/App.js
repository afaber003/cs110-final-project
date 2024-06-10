import React, {useEffect, useState} from 'react';
import './App.css';
import Header from './components/Header';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Base from "./pages/Base";

function App() {

    const [show, setShow] = useState(false);

    // force redirect to login page if on random page
    useEffect(() => {
        if (window.location.href.endsWith('/') || window.location.href.endsWith('3000')) {
            setShow(false)
            window.location.href = 'http://localhost:3000/login'
        }
    }, []);

  return (
    <div className="App">
        <Header show={show} />
        <main>
          <BrowserRouter>
            <Routes>
                <Route path="/" component={<Base/>}>
                    <Route path="login" element={<Login setShow={setShow} />}/>
                    <Route path='home' element={<Home setShow={setShow} />} />
                </Route>
            </Routes>
          </BrowserRouter>
        </main>
    </div>
  );
}

export default App;

