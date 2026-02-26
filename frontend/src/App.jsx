import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AssignmentListing from './pages/AssignmentListing';
import AssignmentWorkspace from './pages/AssignmentWorkspace';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/main.scss';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-main">
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/assignments" element={
                            <ProtectedRoute>
                                <AssignmentListing />
                            </ProtectedRoute>
                        } />
                        <Route path="/assignments/:id" element={
                            <ProtectedRoute>
                                <AssignmentWorkspace />
                            </ProtectedRoute>
                        } />
                        <Route path="/" element={<Navigate to="/assignments" replace />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
