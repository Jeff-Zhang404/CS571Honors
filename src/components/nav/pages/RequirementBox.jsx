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
    'Literature',
    'Natural Science',
];

export default function RequirementsBox(props) {
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
        if (props.onClear) props.onClear();
    };

    const handleSearch = () => {
        if (selectedReqs.length === 0) {
            alert('Please select at least one requirement.');
            return;
        }
        props.onSearch(selectedReqs, matchType);
    };


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
                        <label htmlFor={req} style={{ display: 'flex', alignItems: 'center', flex: 1, cursor: 'pointer', margin: 0, }}>
                            <input type="checkbox" checked={selectedReqs.includes(req)} onChange={() => toggleReq(req)} style={{ marginRight: 8, cursor: 'pointer' }} />
                            <span style={{ flex: 1 }}>{req}</span></label>
                        {tipItems.includes(req) && (
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                style={{
                                    padding: 0,
                                    minWidth: 20,
                                    width: 20,
                                    height: 20,
                                    lineHeight: '20px',
                                    fontSize: 10,
                                    textAlign: 'center',
                                    borderRadius: '50%',
                                    border: '1px solid #aaa',
                                    marginLeft: 4,
                                }}
                                onClick={() => {
                                    {
                                        if (req === 'Communication A') {
                                            alert('If you are an international student or English is not your primary language, please talk with your advisor and check your DARS report. You may have to take or transfer credit for ESL 118 to graduate.')
                                        }
                                        else if (req === 'World Language') {
                                            alert('Please read https://languages.wisc.edu/policy/ and talk with your advisor to make decisions')
                                        }
                                        else if (req === 'Literature') {
                                            alert('Literature credits can also be applied toward humanities requirements')
                                        }
                                        else {
                                            alert('Generally, Biological Science and Physical Science can also fulfill Natural Science requirements')
                                        }
                                    }
                                }}
                            >
                                i
                            </Button>
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
                                style={{ width: 16, height: 16, marginRight: 8, cursor: 'pointer' }}
                            />
                            {type === 'all' ? 'Match all (AND)' : 'Match any (OR)'}
                        </label>

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