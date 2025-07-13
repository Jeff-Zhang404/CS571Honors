import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const requirements = [
    'Communication A',
    'Communication B',
    'Ethnic',
    'World Language',
    'Literature',
    'Humanities',
    'Social Science',
    'Natural Science',
    'Biological Science',
    'Physical Science',
    'Basic Math and Stats',
    'Programming',
];

const tipItems = [
    'Communication A',
    'World Language',
    'Natural Science',
];

export default function RequirementsBox() {
    const [selectedReqs, setSelectedReqs] = useState([]);
    const [matchType, setMatchType] = useState('all');

    const toggleReq = (req) => {
        setSelectedReqs(prev =>
            prev.includes(req)
                ? prev.filter(x => x !== req)
                : [...prev, req]
        );
    };

    const handleClear = () => {
        setSelectedReqs([]);
        setMatchType('all');
    };

    //No implement yet
    const handleSearch = () =>{};



    return (
        <div style={{ maxWidth: 300 }}>
            <div
                style={{
                    fontSize: '1rem',
                    marginBottom: '4px',
                    fontWeight: 500,
                }}
            >
                Select at least one requirements
            </div>

            <fieldset
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '12px',
                    padding: '12px',
                }}
            >
                {requirements.map(req => (
                    <div key={req} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                        <input type="checkbox" checked={selectedReqs.includes(req)} onChange={() => toggleReq(req)} style={{ marginRight: 8 }} />
                        <span style={{ flex: 1 }}>{req}</span>
                        {tipItems.includes(req) && (
                            <span style={{
                                width: '14px',
                                height: '14px',
                                lineHeight: '14px',
                                textAlign: 'center',
                                border: '1px solid #aaa',
                                borderRadius: '50%',
                                fontSize: '10px',
                                color: '#555',
                                userSelect: 'none',
                            }}>
                                i
                            </span>
                        )}

                    </div>
                ))}
            </fieldset>

            <div
                style={{
                    fontSize: '1rem',
                    marginBottom: '4px',
                    fontWeight: 500,
                }}
            >
                Requirements matching types
            </div>

            <fieldset style={{
                position: 'relative',
                border: '1px solid #ccc',
                borderRadius: '12px',
                padding: '20px 12px 12px'
            }}>
                {['all', 'any'].map(type => (
                    <div key={type} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: type === 'all' ? '8px' : 0
                    }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="matchType"
                                checked={matchType === type}
                                onChange={() => setMatchType(type)}
                                style={{ width: 16, height: 16, marginRight: 8 }}
                            />
                            {type === 'all' ? 'Match all (AND)' : 'Match any (OR)'}
                        </label>
                        <span style={{
                            width: 14,
                            height: 14,
                            border: '1px solid #aaa',
                            borderRadius: '50%',
                        }} />
                    </div>
                ))}
            </fieldset>

            <div className="d-flex justify-content-between mt-3">
                <Button
                    variant="secondary"
                    size="lg"
                    className="flex-fill me-2"
                    onClick={handleClear}
                >
                    Clear
                </Button>

                <Button
                    variant="success"
                    size="lg"
                    className="flex-fill ms-2"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </div>

        </div>

    )
}