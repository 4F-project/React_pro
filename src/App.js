import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScreenshotUploader from './components/ScreenshotUploader';
import Results from './components/Results';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ScreenshotUploader />} />
                <Route path="/results" element={<Results />} />
            </Routes>
        </Router>
    );
};

export default App;
