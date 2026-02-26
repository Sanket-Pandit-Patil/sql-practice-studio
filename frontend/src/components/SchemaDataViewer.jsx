import React, { useState } from 'react';

const SchemaDataViewer = ({ tables }) => {
    const [activeTab, setActiveTab] = useState(0);

    if (!tables || tables.length === 0) return <div>No tables found for this assignment.</div>;

    const currentTable = tables[activeTab];

    return (
        <div className="schema-viewer">
            <div className="tab-control">
                {tables.map((table, idx) => (
                    <button
                        key={table.name}
                        className={`tab-btn ${activeTab === idx ? 'active' : ''}`}
                        onClick={() => setActiveTab(idx)}
                    >
                        {table.name}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                <div className="schema-grid">
                    <h4>Columns</h4>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Column</th>
                                <th>Type</th>
                                <th>Nullable</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTable.columns.map(col => (
                                <tr key={col.column_name}>
                                    <td>{col.column_name}</td>
                                    <td>{col.data_type}</td>
                                    <td>{col.is_nullable}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="sample-grid">
                    <h4>Sample Data</h4>
                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    {currentTable.columns.map(col => (
                                        <th key={col.column_name}>{col.column_name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentTable.sampleRows.map((row, i) => (
                                    <tr key={i}>
                                        {currentTable.columns.map(col => (
                                            <td key={col.column_name}>{String(row[col.column_name])}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .schema-viewer {
          background: #0d1117;
          border: 1px solid #3e3e3e;
          border-radius: 4px;
        }
        .tab-control {
          display: flex;
          border-bottom: 1px solid #3e3e3e;
        }
        .tab-btn {
          padding: 0.5rem 1rem;
          background: none;
          border: none;
          color: #858585;
          cursor: pointer;
          min-height: auto;
        }
        .tab-btn.active {
          color: #007bff;
          border-bottom: 2px solid #007bff;
        }
        .tab-content {
          padding: 1rem;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }
        .data-table th, .data-table td {
          border: 1px solid #3e3e3e;
          padding: 0.5rem;
          text-align: left;
        }
        .data-table th { background: #252526; color: #d4d4d4; }
        .table-wrapper { overflow-x: auto; }
        h4 { font-size: 0.8rem; color: #858585; margin: 1rem 0 0.5rem; }
      `}</style>
        </div>
    );
};

export default SchemaDataViewer;
