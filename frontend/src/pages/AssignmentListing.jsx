import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssignments } from '../services/api';
import '../styles/pages/assignment-listing.scss';

const AssignmentListing = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const data = await getAssignments();
                setAssignments(data);
            } catch (err) {
                setError('Failed to load assignments. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAssignments();
    }, []);

    if (loading) return <div className="loading">Loading assignments...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="assignment-listing app-container">
            <header>
                <h1>CipherSQLStudio</h1>
                <p>Master SQL with real-time feedback and intelligent hints.</p>
            </header>

            <div className="assignment-grid">
                {assignments.map((assignment) => (
                    <div
                        key={assignment._id}
                        className="assignment-card"
                        onClick={() => navigate(`/assignments/${assignment._id}`)}
                    >
                        <div className="assignment-card__header">
                            <span className={`difficulty-badge difficulty-badge--${assignment.difficulty.toLowerCase()}`}>
                                {assignment.difficulty}
                            </span>
                            <h3>{assignment.title}</h3>
                        </div>
                        <p className="assignment-card__description">{assignment.description}</p>
                        <button className="btn btn--primary">Attempt Challenge</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssignmentListing;
