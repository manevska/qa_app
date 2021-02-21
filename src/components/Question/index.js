import React from 'react';
import editIcon from "../../assets/images/edit.svg";
import deleteIcon from "../../assets/images/delete.svg";
import {connect} from "react-redux";
/**
 * @namespace Question
 */
/**
 * Generates an expandable question item.
 * @author Elena Manevska <96manevskaelena@gmail.com>
 * @constructor
 * @memberOf Question
 * @param {object} props - Props object.
 * @param {function} props.utilsReducer - Reducer containing actions for updating the state of modal windows.
 * @param {object} props.question - A question object.
 * @return {object} - React Element
 */
function Question (props) {
    const { question } = props;

    /**
     * Dispatches an action to the utilsReducer for changing the state to show the Edit Question Pop-up.
     *
     * @memberOf Question
     * @returns {void}
     */
    function toggleQuestionPopUp() {
        props.dispatch({
            type: 'TOGGLE_QUESTION_MODAL',
            payload: question
        });
    }

    /**
     * Dispatches an action to the utilsReducer for changing the state to show the Confirmation Pop-up.
     *
     * @memberOf Question
     * @returns {void}
     */
    function toggleConfirmationPopUp() {
        props.dispatch({
            type: 'TOGGLE_CONFIRMATION_MODAL',
            payload: question
        });
    }

    /**
     * Adds a className 'expanded' to the target element, to expand the question and show the answer.
     *
     * @memberOf Question
     * @returns {void}
     */
    const toggleQuestion=(e)=> {
        e.target.classList.toggle('expanded');
    };

    return(
        <div className='question' onClick={toggleQuestion}>
            <div className='question--main'>
                <h2>{question.question}</h2>
                <button onClick={toggleQuestionPopUp}>
                    <img src={editIcon} alt="Edit"/>
                </button>
                <button onClick={toggleConfirmationPopUp}>
                    <img src={deleteIcon} alt="Delete"/>
                </button>
            </div>
            <p>{question.answer}</p>
        </div>
    );
}

const mapStateToProps = state => ({
    utilsReducer: state.utilsReducer,
    dataReducer: state.dataReducer
});

export default connect(mapStateToProps)(Question)
