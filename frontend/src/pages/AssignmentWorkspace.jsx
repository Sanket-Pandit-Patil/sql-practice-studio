import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getAssignmentById, executeQuery, getHint } from '../services/api';
import SchemaDataViewer from '../components/SchemaDataViewer';
import ExecutionResults from '../components/ExecutionResults';
import '../styles/pages/assignment-workspace.scss';

const AssignmentWorkspace = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [sql, setSql] = useState('-- Write your SQL query here\nSELECT * FROM ');
    const [execution, setExecution] = useState({ loading: false, results: null, error: null });
    const [hint, setHint] = useState({ loading: false, text: '', error: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkspaceData = async () => {
            try {
                const result = await getAssignmentById(id);
                setData(result);
                // Pre-fill with the first related table for convenience
                if (result.tables && result.tables.length > 0) {
                    setSql(`-- Write your SQL query here\nSELECT * FROM ${result.tables[0].name} LIMIT 10;`);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkspaceData();
    }, [id]);

    const handleExecute = async () => {
        setExecution({ loading: true, results: null, error: null });
        setHint({ ...hint, text: '' }); // Clear hint when executing new query
        try {
            const res = await executeQuery(sql, id);
            setExecution({ loading: false, results: res, error: null });
        } catch (err) {
            setExecution({
                loading: false,
                results: null,
                error: err.response?.data?.error?.message || 'Execution failed'
            });
        }
    };

    const handleGetHint = async () => {
        setHint({ loading: true, text: '', error: null });
        try {
            const res = await getHint(id, sql, execution.error);
            setHint({ loading: false, text: res.hint, error: null });
        } catch (err) {
            console.error('Hint error:', err);
            setHint({
                loading: false,
                text: '',
                error: err.response?.data?.error?.message || 'Failed to get hint. Please check backend logs or API key.'
            });
        }
    };

    if (loading) return <div className="loading">Loading workspace...</div>;
    if (!data) return <div className="error">Assignment not found.</div>;

    return (
        <div className="assignment-workspace">
            <nav className="workspace-nav">
                <button className="btn btn--secondary" onClick={() => navigate('/assignments')}>
                    ← Back to Assignments
                </button>
                <div className="workspace-nav__title">
                    <h2>{data.assignment.title}</h2>
                    <span className={`difficulty-badge difficulty-badge--${data.assignment.difficulty.toLowerCase()}`}>
                        {data.assignment.difficulty}
                    </span>
                </div>
            </nav>

            <div className="workspace-layout">
                {/* Left Panel: Question and Schema */}
                <div className="workspace-panel workspace-panel--info">
                    <section className="question-section">
                        <h3>Problem Statement</h3>
                        <p className="question-text">{data.assignment.question}</p>
                    </section>

                    <section className="schema-section">
                        <h3>Schema & Sample Data</h3>
                        <SchemaDataViewer tables={data.tables} />
                    </section>
                </div>

                {/* Right Panel: Editor and Results */}
                <div className="workspace-panel workspace-panel--editor">
                    <div className="editor-container">
                        <div className="panel-header">
                            <span>SQL Editor</span>
                            <div className="actions">
                                <button
                                    className="btn btn--hint"
                                    onClick={handleGetHint}
                                    disabled={hint.loading}
                                >
                                    {hint.loading ? 'Thinking...' : '💡 Get Hint'}
                                </button>
                                <button
                                    className="btn btn--success"
                                    onClick={handleExecute}
                                    disabled={execution.loading}
                                >
                                    {execution.loading ? 'Running...' : '▶ Execute Query'}
                                </button>
                            </div>
                        </div>
                        <div className="monaco-wrapper">
                            <Editor
                                height="40vh"
                                defaultLanguage="sql"
                                theme="vs-dark"
                                value={sql}
                                onChange={(value) => setSql(value)}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    scrollBeyondLastLine: false,
                                }}
                            />
                        </div>
                    </div>

                    <div className="results-container">
                        <div className="panel-header">Query Results</div>
                        {hint.text && (
                            <div className="hint-box hint-box--success">
                                <strong>💡 Hint:</strong> {hint.text}
                            </div>
                        )}
                        {hint.error && (
                            <div className="hint-box hint-box--error">
                                <strong>⚠️ Error:</strong> {hint.error}
                            </div>
                        )}
                        <ExecutionResults
                            results={execution.results}
                            error={execution.error}
                            loading={execution.loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentWorkspace;
