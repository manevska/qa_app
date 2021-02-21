import React from 'react';
import editIcon from "../../assets/images/edit.svg";
import deleteIcon from "../../assets/images/delete.svg";
import {connect} from "react-redux";

function Question (props) {
    const { question } = props;

    function toggleQuestionPopUp() {
        props.dispatch({
            type: 'TOGGLE_QUESTION_MODAL',
            payload: question
        });
    }

    function toggleConfirmationPopUp() {
        props.dispatch({
            type: 'TOGGLE_CONFIRMATION_MODAL',
            payload: question
        });
    }

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
