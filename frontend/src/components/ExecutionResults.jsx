import React from 'react';

const ExecutionResults = ({ results, error, loading }) => {
    if (loading) return <div className="results-msg">Executing query...</div>;

    if (error) {
        return (
            <div className="results-error">
                <h4>Error executing query</h4>
                <pre>{error}</pre>
            </div>
        );
    }

    if (!results) {
        return <div className="results-msg">Run a query to see results here.</div>;
    }

    if (results.rows.length === 0) {
        return <div className="results-msg">Query successful. No rows returned.</div>;
    }

    return (
        <div className="execution-results">
            <div className="results-meta">
                {results.rowCount} rows returned
            </div>
            <div className="results-table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            {results.columns.map(col => <th key={col}>{col}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {results.rows.map((row, i) => (
                            <tr key={i}>
                                {results.columns.map(col => <td key={col}>{String(row[col])}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .execution-results {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }
        .results-msg { padding: 2rem; text-align: center; color: #858585; }
        .results-error { padding: 1rem; color: #dc3545; background: rgba(220, 53, 69, 0.1); border: 1px solid #dc3545; margin: 1rem; border-radius: 4px; }
        .results-meta { padding: 0.5rem 1rem; font-size: 0.8rem; color: #858585; border-bottom: 1px solid #3e3e3e; }
        .results-table-wrapper { flex: 1; overflow: auto; padding: 1rem; }
        .data-table { border-collapse: collapse; min-width: 100%; font-size: 0.9rem; }
        .data-table th, .data-table td { border: 1px solid #3e3e3e; padding: 0.75rem; text-align: left; }
        .data-table th { background: #252526; position: sticky; top: 0; }
        pre { white-space: pre-wrap; word-break: break-all; margin-top: 0.5rem; }
      `}</style>
        </div>
    );
};

export default ExecutionResults;
