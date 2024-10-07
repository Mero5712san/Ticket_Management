import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menubar from '../Components/Menubar/Menubar';
import NaviBar from '../Components/Navibar/NaviBar';
import '../Styles/Router.css'
import Sample from '../Pages/Sample';
const MainRouter = () => {
    return (
        <div className="mastercontainer">
            <BrowserRouter>
                <div className="sidecontainer">
                    <Menubar />
                </div>
                <div className="pagecontainer">
                    <div className="navibar">
                        <NaviBar />
                    </div>
                    <Routes>
                        <Route path='/' element={<Sample/>}  />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default MainRouter;
