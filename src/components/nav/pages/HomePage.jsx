import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import RequirementBox from './RequirementBox';

export default function HomePage() {

    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [matchType, setMatchType] = useState('all');

    const [selectedSchoolIdx, setSelectedSchoolIdx] = useState(null);
    const [selectedBreadthIdx, setSelectedBreadthIdx] = useState(null);

    //Read data
    useEffect(() => {
        const base = import.meta.env.BASE_URL;

        fetch(`${base}Data/CoursesData.json`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setCourses(data);
            })
    }, [])

    //Handle search
    const handleSerch = (requirement, matchtype) => {
        //Clear all things to prevent some strange and dangerous behaviors
        setHasSearched(false);
        setFilteredCourses([]);
        setSelectedSchoolIdx(null);
        setSelectedBreadthIdx(null);

        setMatchType(matchtype);

        const filter = courses.filter(course => matchtype === 'all' ?
            requirement.every(r => course.requirementsSatisfied.includes(r)) :
            requirement.some(r => course.requirementsSatisfied.includes(r))
        );
        setFilteredCourses(filter);
        setHasSearched(true);
    }

    //Handle Clear
    const handleClear = () => {
        setFilteredCourses([]);
        setHasSearched(false);
        setMatchType('all');
        setSelectedSchoolIdx(null);
        setSelectedBreadthIdx(null);
    }

    //Group by school
    const groupedBySchool = useMemo(() => {
        const m = {};
        filteredCourses.forEach(course => {
            const key = `${course.institution}`;
            if (!m[key]) {
                m[key] = { institution: course.institution, city: course.city, stateAbbrev: course.stateAbbrev, courses: [course], requirementsSatisfied: [...course.requirementsSatisfied], }
            }
            else {
                m[key].courses.push(course);
                course.requirementsSatisfied.forEach(req => {
                    if (!m[key].requirementsSatisfied.includes(req)) {
                        m[key].requirementsSatisfied.push(req);
                    }
                })
            }
        })

        return Object.values(m);

    }, [filteredCourses]);

    return (
        <div>
            <Container fluid className="mt-4">
                <Row>
                    <Col sm={4} style={{ marginTop: '-20px' }}>
                        <RequirementBox onSearch={handleSerch} onClear={handleClear} />
                    </Col>

                    <Col sm={8}>
                        <div style={{
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            padding: '24px',
                            minHeight: '500px',
                            color: '#666',
                            fontSize: '1rem',
                            lineHeight: 1.6,
                        }}>
                            {!hasSearched && (
                                <>
                                    <p>This tool can help UW-Madison students to find general education / breadth courses on other schools.</p>
                                    <p>Hover your mouse over the “i” icon to view helpful tips.</p>
                                    <p>Log in your account to save results.</p>

                                </>

                            )}

                            {hasSearched && groupedBySchool.length === 0 && (
                                <p>No matching schools found.</p>
                            )}

                            {hasSearched && groupedBySchool.length > 0 && selectedSchoolIdx === null && (
                                groupedBySchool.map((school, idx) => (
                                    <Card key={idx} onClick={() => setSelectedSchoolIdx(idx)} border="success" style={{ marginBottom: 12 }}>
                                        <Card.Body>
                                            <Card.Title>{school.institution}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                {school.city}, {school.stateAbbrev}
                                            </Card.Subtitle>
                                            <Card.Text>
                                                Fulfills: {school.requirementsSatisfied.join(', ')}
                                                {matchType === 'all' ? ' concurrently' : ''}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))

                            )
                            }

                            {hasSearched && selectedSchoolIdx !== null && matchType === 'all' && (
                                <div>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => setSelectedSchoolIdx(null)}
                                        className="mb-3"
                                    >
                                        ← Back to schools
                                    </Button>

                                    <p>
                                        {groupedBySchool[selectedSchoolIdx].institution}
                                        {' '}— matched{' '}
                                        {groupedBySchool[selectedSchoolIdx].requirementsSatisfied.length}{' '}
                                        requirement{groupedBySchool[selectedSchoolIdx].requirementsSatisfied.length > 1 ? 's' : ''}
                                    </p>

                                    {groupedBySchool[selectedSchoolIdx].courses.map((course) => (
                                        <Card key={course.institution + course.courseCode} border="success" style={{ marginBottom: 12, cursor: 'pointer' }}>
                                            <Card.Body>
                                                <div><strong>Course number:</strong> {course.courseCode}</div>
                                                <div><strong>Equivalent:</strong> {course.equivalent}</div>
                                                <div>
                                                   <strong>Fulfill:</strong> {course.requirementsSatisfied.join(', ')}
                                                </div>

                                            </Card.Body>
                                        </Card>
                                    ))}


                                </div>
                            )
                            }

                            {hasSearched && selectedSchoolIdx !== null && matchType !== 'all' && selectedBreadthIdx === null && (
                                <div>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => setSelectedSchoolIdx(null)}
                                        className="mb-3"
                                    >
                                        ← Back to schools
                                    </Button>

                                    <p>
                                        {groupedBySchool[selectedSchoolIdx].institution}
                                    </p>

                                    {groupedBySchool[selectedSchoolIdx].requirementsSatisfied.map((req, idx) => (
                                        <Card key={idx} onClick={() => setSelectedBreadthIdx(idx)} border="success" style={{ marginBottom: 12, cursor: 'pointer' }}>
                                            <Card.Body>
                                                {req}:
                                            </Card.Body>
                                        </Card>
                                    ))}


                                </div>
                            )}

                            {hasSearched && selectedSchoolIdx !== null && matchType !== 'all' && selectedBreadthIdx !== null && (
                                (() => {
                                    const school = groupedBySchool[selectedSchoolIdx];
                                    const breadth = school.requirementsSatisfied[selectedBreadthIdx];
                                    const coursesInBreadth = school.courses.filter(c => c.requirementsSatisfied.includes(breadth));

                                    return (
                                        <div>
                                            <Button variant='outline-secondary' size='sm' onClick={() => setSelectedBreadthIdx(null)} className="mb-3">
                                                ← Back to breadth
                                            </Button>

                                            <p>{school.institution} - {breadth} ({coursesInBreadth.length}{' '}
                                                course{coursesInBreadth.length > 1 ? 's' : ''})
                                            </p>

                                            {coursesInBreadth.map((course, idx) => (
                                                <Card key={idx} border='success' style={{ marginBottom: 12, cursor: 'pointer' }}>
                                                    <Card.Body>
                                                        <div><strong>Course number:</strong> {course.courseCode}</div>
                                                        <div><strong>Equivalent:</strong> {course.equivalent}</div>
                                                        <div>
                                                            <strong>Fulfill:</strong>{' '}
                                                            {course.requirementsSatisfied.join(', ')}
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            ))}

                                        </div>
                                    );
                                })()
                            )}




                        </div>
                    </Col>

                </Row>
            </Container>


        </div>

    )
}