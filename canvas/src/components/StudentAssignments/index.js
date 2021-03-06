import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../reducers';
import * as actions from '../../actions/assignments';
import AssignmentRow from '../AssignmentRow';

const StudentAssignments = ({ assignments, isLoading, onLoad }) => {
    useEffect(onLoad, []);

    return (
        <Fragment>
            {
                assignments.length === 0 && !isLoading && (
                    <p>
                        <strong>{'No hay tareas asignadas'}</strong>
                    </p>
                )
            }
            {
                // Cambiar esto con un spinner
                isLoading && (
                    <p>{'Cargando'}</p>
                )
            }
            {
                assignments.length > 0 && !isLoading && (
                    <table>
                        <thead className='table-header'>
                            <th>Nombre</th>
                            <th>Curso</th>
                            <th>Fecha</th>
                            <th>Puntos</th>
                        </thead>
                        <tbody>
                            {
                                assignments.map(({ id }) => 
                                    <AssignmentRow 
                                        key={id} 
                                        id={id} 
                                    />
                                )
                            }
                        </tbody>
                    </table>
                )
            }
        </Fragment>
    );
};

export default connect (
    state => ({
        assignments: selectors.getAssignments(state),
        isLoading: selectors.getIsFetchingAssignments(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingAssignments());
        },
    }),
)(StudentAssignments);