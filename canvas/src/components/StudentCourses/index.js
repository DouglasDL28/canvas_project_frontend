import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import NavBar from '../../components/NavBar';
import * as selectors from '../../reducers';
import * as actions from '../../actions/studentCourses';
import CourseCard from '../CourseCard';

const StudentCourses = ({studentCourses, isLoading, onLoad}) => {
    useEffect(onLoad, []);
    return (
        <Fragment>
            {
                studentCourses.length <= 0 && !isLoading (
                    <div className='title'> No hay cursos asignados </div>
                )
            }
            {
                isLoading && (
                    <div className='title'> Cargando... </div>
                )
            }
            {
                petOwners.length > 0 && !isLoading && (
                    <div className='student-courses-container'>
                        {
                            studentCourses.map(({id, name, section, year, cicle}) => <CourseCard key={id} id={id} name={name} section={section} year={year} cicle={cicle}/>)
                        }
                    </div>
                )
            }
        </Fragment>
    );
};

export default connect(
    state => ({
        studentCourses: selectors.getStudentCourses(state),
        isLoading: selectors.getIsFetchingStudentCourses(state),
    }),
    dispatch => ({
        onLoad(){
            dispatch(actions.startFetchingStudentCourses());
        },
    }),
    )(StudentCourses);