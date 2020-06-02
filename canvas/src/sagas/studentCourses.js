import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/studentCourses';
import * as types from '../types/studentCourses';
import * as schemas from '../schemas/courses';


function* fetchStudentCourses(action) {
    try {
        const isAuth = yield select(selectors.getIsAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const user = yield select(selectors.getLoggedUser);
            console.log(user)

            const response = yield call(
                fetch,
                `${API_BASE_URL}/students/${user.student}/courses/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                const jsonResult = yield response.json();
                const {
                    entities: { courses },
                    result,
                } = normalize(jsonResult, schemas.courses);

                yield put(
                    actions.completeFetchingStudentCourses(
                        courses,
                        result,
                    ),
                );
            } else {
                // const { non_field_errors } = yield response.json();
                // yield put(actions.failLogin(non_field_errors[0]));
            }
        }
    } catch (error) {
        yield put(actions.failFetchingStudentCourses('Error en la conexión con el servidor.'));
        console.log("ERROR", error)
    }
};

export function* watchstudentCoursesFetch() {
    yield takeEvery(
        types.STUDENT_COURSES_FETCH_STARTED,
        fetchStudentCourses,
    );
};

// function* addStudentCourse(action) {
//     try {
//         const isAuth = yield select(selectors.isAuthenticated);

//         if (isAuth) {
//             const token = yield select(selectors.getAuthToken);
//             const response = yield call(
//                 fetch,
//                 `${API_BASE_URL}/owners/`, {
//                     method: 'POST',
//                     body: JSON.stringify(action.payload),
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `JWT ${token}`,
//                     },
//                 }
//             );

//             if (response.status === 201) {
//                 const jsonResult = yield response.json();
//                 yield put(
//                     actions.completeAddingStudentCourse(
//                         action.payload.id,
//                         jsonResult,
//                     ),
//                 );
//                 // const {
//                 //   entities: { studentCourses },
//                 //   result,
//                 // } = normalize(jsonResult, schemas.studentCourses);

//                 // yield put(
//                 //   actions.completeFetchingstudentCourses(
//                 //     studentCourses,
//                 //     result,
//                 //   ),
//                 // );
//             } else {
//                 // const { non_field_errors } = yield response.json();
//                 // yield put(actions.failLogin(non_field_errors[0]));
//             }
//         }
//     } catch (error) {
//         // yield put(actions.failLogin('Falló horrible la conexión mano'));
//         console.log("ERROR", error)
//     }
// };

// export function* watchAddStudentCourse() {
//     yield takeEvery(
//         types.STUDENT_COURSE_ADD_STARTED,
//         addStudentCourse,
//     );
// };

// function* removeStudentCourse(action) {
//     try {
//         const isAuth = yield select(selectors.isAuthenticated);

//         if (isAuth) {
//             const token = yield select(selectors.getAuthToken);
//             const response = yield call(
//                 fetch,
//                 `${API_BASE_URL}/owners/${action.payload.id}/`, {
//                     method: 'DELETE',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `JWT ${token}`,
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 yield put(actions.completeRemovingStudentCourse());
//                 // const {
//                 //   entities: { studentCourses },
//                 //   result,
//                 // } = normalize(jsonResult, schemas.studentCourses);

//                 // yield put(
//                 //   actions.completeFetchingstudentCourses(
//                 //     studentCourses,
//                 //     result,
//                 //   ),
//                 // );
//             } else {
//                 // const { non_field_errors } = yield response.json();
//                 // yield put(actions.failLogin(non_field_errors[0]));
//             }
//         }
//     } catch (error) {
//         // yield put(actions.failLogin('Falló horrible la conexión mano'));
//         console.log("ERROR", error)
//     }
// };

// export function* watchRemoveStudentCourse() {
//     yield takeEvery(
//         types.STUDENT_COURSE_REMOVE_STARTED,
//         removeStudentCourse,
//     );
// };