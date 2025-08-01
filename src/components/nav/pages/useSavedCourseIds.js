import { useState, useEffect, useCallback } from 'react';

//the key in localStorage
const STORAGE_KEY = 'savedCoursesIds';

//unique id for each course
export const makeKey = (course) => `${course.institution}: ${course.courseCode} ${course.courseName}`;

//helper method to read data from localStorage
function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch {
        return [];
    }

}

//helper method to save the localStorage data
function persistToStorage(arr) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch { }
}

export function useSavedCourseIds() {

    //read saved courses
    const [savedIds, setSavedIds] = useState(() => new Set(loadFromStorage()));

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === STORAGE_KEY) {
                const arr = loadFromStorage();
                setSavedIds(new Set(arr));
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    //Save courses
    const saveId = useCallback((id) => {
        setSavedIds((prev) => {
            if (prev.has(id)) {
                alert(`${id} already saved.`);
                return prev;
            }
            const next = new Set(prev);
             //put this course to localStorage
            next.add(id);
            persistToStorage(Array.from(next)); //update localStorage
            alert(`${id} saved.`);
            return next;
        });
    }, []);

    //unsave courses
    const unsaveId = useCallback((id) => {
        setSavedIds((prev) => {
            if (!prev.has(id)) {
                alert(`${id} is not in saved list.`);
                return prev;
            }
            const next = new Set(prev);
             //remove this course from localStorage
            next.delete(id);
            persistToStorage(Array.from(next));
            alert(`${id} removed from saved.`); //update localStorage
            return next;
        });
    }, []);

    //judge whether a course has been saved
    const isSaved = useCallback((id) => {
        return savedIds.has(id);
    }, [savedIds]);

    return {
        savedIds,
        saveId,
        unsaveId,
        isSaved,
    };

}