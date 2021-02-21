import React from 'react';
import closeIcon from "../../assets/images/close.svg";
import {connect} from "react-redux";

function ConfirmationPopUp (props) {
    const { currentQuestion } = props.utilsReducer;

    const singleQuestionMode = Object.keys(currentQuestion).length !== 0;

    function togglePopUp() {
        props.dispatch({
            type: 'TOGGLE_CONFIRMATION_MODAL'
        });
    }

    function deleteQuestion() {
        props.dispatch({
            type: 'REMOVE_QUESTION',
            payload: props.utilsReducer.currentQuestion
        });
        togglePopUp();
    }

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
