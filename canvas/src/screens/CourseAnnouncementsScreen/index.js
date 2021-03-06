import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import NavBar from '../../components/NavBar';
import * as selectors from '../../reducers';
import * as actions from '../../actions/announcements';

import CourseNavbar from '../../components/CourseNavbar';
import AnnouncementRow from '../../components/AnnouncementRow';

import './styles.css'
import { Link } from 'react-router-dom';

const CourseAnnouncementsScreen = ({ match, course, user, isLoading, onLoad, announcements, userType }) => {
    useEffect(onLoad, []);

    return (
        <Fragment>
            <div className='route-screen'>
                <NavBar />
                <div className="course-anncmt-container">
                    <div className="header"> {user.username.toUpperCase()} </div>
                    <div className="course-anncmt-data">
                        <CourseNavbar id={course.id} />
                        <div className="course-anncmt-description">
                            <div className='course-anncmt-header'> Anuncios</div>
                            <div className='course-anncmt-text'> Ciclo {course.cicle} - {course.year}</div>
                            <Fragment>
                                {
                                    announcements.length === 0 && !isLoading && (
                                        <p>
                                            <strong>{'No hay ningún anuncio'}</strong>
                                        </p>
                                    )
                                }
                                {
                                    isLoading && (
                                        <p>
                                            {'Cargando...'}
                                        </p>
                                    )
                                }
                                {
                                    announcements.length > 0 && !isLoading && (
                                        <table className='course-anncmt-table'>
                                            <thead className='table-header'>
                                                <tr>
                                                    <th>Título</th>
                                                    <th>Curso</th>
                                                    <th>Mensaje</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    announcements.map(({ id }) => 
                                                        <AnnouncementRow
                                                            key={id}
                                                            id={id}
                                                        />
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    )
                                }
                                {
                                    !isLoading && userType !== 0 && (
                                        <Link to={`/courses/${course.id}/new-announcement`}>
                                            <button className='up'>
                                                {'Crear Anuncio'}
                                            </button>
                                        </Link>
                                    ) 
                                }
                            </Fragment>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default connect(
    (state, { match }) => ({
        course: selectors.getCourse(state, match.params.id),
        user: selectors.getLoggedUser(state),
        isLoading: selectors.getIsFetchingAssignments(state),
        announcements: selectors.getAnnouncements(state),
        userType: selectors.getSelectedUserType(state),
    }),
    (dispatch, { match }) => ({
        onLoad() {
            dispatch(actions.startFetchingAnnouncements(match.params.id));
        },
    }),
)(CourseAnnouncementsScreen);