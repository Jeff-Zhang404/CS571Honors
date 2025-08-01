import React, { useContext, useMemo } from 'react';
import { DataContext } from '../../DataContext';
import { useSavedCourseIds, makeKey } from './useSavedCourseIds';
import { Card, Button } from 'react-bootstrap';

export default function SavedCoursesPage() {
  const { courses } = useContext(DataContext);
  const { savedIds, unsaveId } = useSavedCourseIds();

  const savedCourses = useMemo(
    () => courses.filter((c) => savedIds.has(makeKey(c))),
    [courses, savedIds]
  );

  if (savedCourses.length === 0) return <div>No saved courses yet.</div>;

  return (
    <div style={{ padding: 16 }}>
      <h1>Saved Courses</h1>
      {savedCourses.map((course, idx) => {
        const key = `${course.institution}-${course.courseCode}-${idx}`;
        return (
          <Card
            key={key}
            border="success"
            style={{ marginBottom: 12, position: 'relative' }}
          >
            <Card.Body>
              <div>
                <strong>Course number:</strong> {course.courseCode}
              </div>
              <div>
                <strong>Equivalent:</strong> {course.equivalent}
              </div>
              <div>
                <strong>Fulfill:</strong>{' '}
                {course.requirementsSatisfied.join(', ')}
              </div>
              <div>
                <em>
                  {course.institution}, {course.city}, {course.stateAbbrev}
                </em>
              </div>
            </Card.Body>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                unsaveId(makeKey(course));
              }}
              style={{ position: 'absolute', top: 8, right: 8 }}
            >
              Unsave
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
