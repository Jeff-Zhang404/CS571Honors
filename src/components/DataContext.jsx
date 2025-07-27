import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext({
    courses: [],
    error: null,
});

export function DataProvider({ children }) {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

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
            .catch(err => {
                setError(err);
            });
    }, [])

    return (
        <DataContext.Provider value={{ courses, error }}>
            {children}
        </DataContext.Provider>
    );

}