import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import RequirementBox from './RequirementBox';

export default function HomePage() {

    const [courses, setCourses] = useState([]); //fetch course data
    const [filteredCourses, setFilteredCourses] = useState([]); //filterd courses after clicking on 'search'

    const [hasSearched, setHasSearched] = useState(false); //identify whether 'search' button is clicked
    const [matchType, setMatchType] = useState('all'); //initial matching type

    const [selectedSchoolIdx, setSelectedSchoolIdx] = useState(null); //first round search; returns school
    const [selectedBreadthIdx, setSelectedBreadthIdx] = useState(null); //second round search for 'OR' requirement; returns fulfilled breadth

    const [expandedCourses, setExpandedCourses] = useState({}); //third round search for 'OR'; second round search for 'AND'



    //Read data
    useEffect(() => {
        const base = import.meta.env.BASE_URL;

        fetch(`${base}Data/courses_with_course_descriptions.json`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                //console.log(data);
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
        setExpandedCourses({});

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
        setExpandedCourses({});
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

    // console.log(groupedBySchool);

    //Expand course details
    const toggleExpand = (idx) => {
        setExpandedCourses(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    return (
        <div>
            <Container fluid className="mt-4">
                <Row>
                    {/* Requirement box part */}
                    <Col sm={4} style={{ marginTop: '-20px' }}>
                        <RequirementBox onSearch={handleSerch} onClear={handleClear} />
                    </Col>

                    {/* result part */}
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

                            {/* First round of search; returns a list of schools */}
                            {hasSearched && groupedBySchool.length > 0 && selectedSchoolIdx === null && (
                                groupedBySchool.map((school, idx) => (
                                    <Card key={idx} onClick={() => setSelectedSchoolIdx(idx)} border="success" style={{ marginBottom: 12, cursor: 'pointer' }}>
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

                            {/* Second round of search for 'AND'; returns a list of courses */}
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

                                    {groupedBySchool[selectedSchoolIdx].courses.map((course, idx) => (
                                        <Card key={idx} border="success" style={{ marginBottom: 12 }}>
                                            <Button variant='success' size="sm" className="position-absolute top-0 end-0 m-2">Save</Button>
                                            <Card.Body>
                                                <div><strong>Course number:</strong> {course.courseCode}</div>
                                                <div><strong>Equivalent:</strong> {course.equivalent}</div>
                                                <div>
                                                    <strong>Fulfill:</strong> {course.requirementsSatisfied.join(', ')}
                                                </div>


                                            </Card.Body>
                                            <Button variant='secondary' size="sm" onClick={() => toggleExpand(idx)}>{expandedCourses[idx] ? 'Hide Details' : 'View Details'}</Button>

                                            {expandedCourses[idx] && (
                                                <Card.Footer>
                                                    <p><strong>Requirement(s) Satisfied:</strong> {course.requirementsSatisfied.join(', ')}<br />
                                                        <strong>Link:</strong>{' '}<a href={course.link} target="_blank" rel="noopener noreferrer">{course.link}</a><br />
                                                        <strong>Description:</strong> {course.shortDescription}<br />
                                                        <strong>Credits:</strong> {course.credits}</p>
                                                </Card.Footer>
                                            )}

                                        </Card>
                                    ))}

                                </div>
                            )
                            }

                            {/* Second round search for 'OR'; returns a list of breadth requirements */}
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

                            {/* Third round search for 'OR'; returns a list of courses  */}
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
                                                <Card key={idx} border='success' style={{ marginBottom: 12 }}>
                                                    <Card.Body>
                                                        <Button variant='success' size="sm" className="position-absolute top-0 end-0 m-2">Save</Button>
                                                        <div><strong>Course number:</strong> {course.courseCode}</div>
                                                        <div><strong>Equivalent:</strong> {course.equivalent}</div>
                                                        <div>
                                                            <strong>Fulfill:</strong>{' '}
                                                            {course.requirementsSatisfied.join(', ')}
                                                        </div>
                                                    </Card.Body>
                                                    <Button variant='secondary' size="sm" onClick={() => toggleExpand(idx)}>{expandedCourses[idx] ? 'Hide Details' : 'View Details'}</Button>
                                                    {expandedCourses[idx] && (
                                                        <Card.Footer>
                                                            <p><strong>Requirement(s) Satisfied:</strong> {course.requirementsSatisfied.join(', ')}<br />
                                                                <strong>Link:</strong>{' '}<a href={course.link} target="_blank" rel="noopener noreferrer">{course.link}</a><br />
                                                                <strong>Description:</strong> {course.shortDescription}<br />
                                                                <strong>Credits:</strong> {course.credits}</p>
                                                        </Card.Footer>
                                                    )}
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