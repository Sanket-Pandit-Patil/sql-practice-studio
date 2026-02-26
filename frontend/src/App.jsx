import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AssignmentListing from './pages/AssignmentListing';
import AssignmentWorkspace from './pages/AssignmentWorkspace';
import './styles/main.scss';

function App() {
    return (
        <Router>
            <div className="app-main">
                <Routes>
                    <Route path="/assignments" element={<AssignmentListing />} />
                    <Route path="/assignments/:id" element={<AssignmentWorkspace />} />
                    <Route path="/" element={<Navigate to="/assignments" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
