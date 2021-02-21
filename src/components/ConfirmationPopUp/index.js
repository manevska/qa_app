import React from 'react';
import closeIcon from "../../assets/images/close.svg";
import {connect} from "react-redux";
/**
 * @namespace ConfirmationPopUp
 */
/**
 * Generates a pop-up for confirming that the question should be removed.
 * @author Elena Manevska <96manevskaelena@gmail.com>
 * @constructor
 * @memberOf ConfirmationPopUp
 * @param {object} props - Props object.
 * @param {function} props.utilsReducer - Reducer containing actions for updating the state of modal windows.
 * @param {object} props.utilsReducer.currentQuestion - The question we want to remove.
 * @return {object} - React Element
 */
function ConfirmationPopUp (props) {
    const { currentQuestion } = props.utilsReducer;

    const singleQuestionMode = Object.keys(currentQuestion).length !== 0;

    /**
     * Dispatches an action to the utilsReducer for changing the state to hide the Confirmation Pop-up.
     *
     * @memberOf ConfirmationPopUp
     * @returns {void}
     */
    function togglePopUp() {
        props.dispatch({
            type: 'TOGGLE_CONFIRMATION_MODAL'
        });
    }

    /**
     * Dispatches an action to the dataReducer for removing the selected question.
     *
     * @memberOf ConfirmationPopUp
     * @returns {void}
     */
    function deleteQuestion() {
        props.dispatch({
            type: 'REMOVE_QUESTION',
            payload: props.utilsReducer.currentQuestion
        });
        togglePopUp();
    }

    /**
     * Dispatches an action to the dataReducer for removing all questions.
     *
     * @memberOf ConfirmationPopUp
     * @returns {void}
     */
    function deleteAllQuestions() {
        props.dispatch({
            type: 'REMOVE_ALL'
        });
        togglePopUp();
    }

    return(
        <div className={'popup --confirmation'}>
            <header>
                <h1>Are you sure you want to delete {singleQuestionMode ? 'this question' : 'all questions'}?</h1>
                <button onClick={togglePopUp}>
                    <img src={closeIcon} alt="close"/>
                </button>
            </header>
            <main>
                <button className={'btn-secondary'} onClick={togglePopUp}>No</button>
                <button onClick={singleQuestionMode ? deleteQuestion : deleteAllQuestions}>Yes</button>
            </main>
        </div>
    );
}

const mapStateToProps = state => ({
    utilsReducer: state.utilsReducer
});

export default connect(mapStateToProps)(ConfirmationPopUp)
