import React, {useState} from 'react';
import closeIcon from "../../assets/images/close.svg";
import {connect} from "react-redux";
/**
 * @namespace QuestionPopUp
 */
/**
 * Generates a Pop-up for adding a new question or editing an existing question.
 * @author Elena Manevska <96manevskaelena@gmail.com>
 * @constructor
 * @memberOf QuestionPopUp
 * @param {object} props - Props object.
 * @param {function} props.utilsReducer - Reducer containing actions for updating the state of modal windows.
 * @param {object} props.utilsReducer.currentQuestion - A question object for the question we are editing.
 * @param {string} props.utilsReducer.currentQuestion.question - The question we are editing.
 * @param {string} props.utilsReducer.currentQuestion.answer - The answer we are editing.
 * @return {object} - React Element
 */
function QuestionPopUp (props) {
    const { currentQuestion } = props.utilsReducer;

    const editMode = Object.keys(currentQuestion).length !== 0;

    const [question, setQuestion] = useState(editMode ? currentQuestion.question : '');
    const [answer, setAnswer] = useState(editMode ? currentQuestion.answer : '');
    const [counter, setCounter] = useState(null);
    const [delay, setDelay] = useState(false);

    const emptyQuestion = question.trim().length === 0;

    /**
     * Dispatches an action to the utilsReducer for changing the state to hide the Add New Question Pop-up.
     *
     * @memberOf QuestionPopUp
     * @returns {void}
     */
    function togglePopUp() {
        props.dispatch({
            type: 'TOGGLE_QUESTION_MODAL'
        });
    }

    /**
     * A hook with one dependency - counter. When the counter is set to 5, it sets a timer and a countdown starts.
     * When the counter hits 0, the question is submitted.
     *
     * @memberOf QuestionPopUp
     * @returns {void}
     */
    React.useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        counter === 0 && (editMode ? updateQuestion() : addQuestion());
    }, [counter]);

    /**
     * Generates a random id for the new question.
     * Dispatches an action to the dataReducer for adding a new question.
     *
     * @memberOf QuestionPopUp
     * @returns {void}
     */
    function addQuestion() {
        const id = Math.floor(Math.random() * (10000 - 1) + 1);
        props.dispatch({
            type: 'ADD_QUESTION',
            payload: {
                id: id,
                question: question,
                answer: answer
            }
        });
        togglePopUp();
    }

    /**
     * Dispatches an action to the utilsReducer for updating an existing question.
     *
     * @memberOf QuestionPopUp
     * @returns {void}
     */
    function updateQuestion() {
        props.dispatch({
            type: 'UPDATE_QUESTION',
            payload: {
                id: currentQuestion.id,
                question: question,
                answer: answer
            }
        });
        togglePopUp();
    }

    return(
        <div className={'popup'}>
            <header>
                <h1>{editMode ? 'Edit' : 'Add new'} question</h1>
                <button onClick={togglePopUp}>
                    <img src={closeIcon} alt="close"/>
                </button>
            </header>
            <main>
                <label htmlFor="question">Question <span>*</span></label>
                <input type="text"
                       id={'question'}
                       value={question}
                       onChange={e => setQuestion(e.target.value)}/>
                <label htmlFor="answer">Answer</label>
                <textarea id={'question'}
                          cols="30"
                          rows="10"
                          value={answer}
                          onChange={e => setAnswer(e.target.value)}/>

                <div className={'input-group'}>
                    <input disabled={counter} id='delay' type='checkbox' checked={delay} onChange={() => setDelay(!delay)}/>
                    {
                        !delay ?
                        <label htmlFor="delay">Add a 5 second delay to the question.</label> :
                            <label htmlFor="delay">Your question will be added in: {counter || 5} seconds.</label>
                    }
                </div>
                <button disabled={emptyQuestion} onClick={delay ? () => setCounter(5) : editMode ? updateQuestion : addQuestion}>Save</button>
            </main>
        </div>
    );
}

const mapStateToProps = state => ({
    utilsReducer: state.utilsReducer,
    dataReducer: state.dataReducer
});

export default connect(mapStateToProps)(QuestionPopUp)
