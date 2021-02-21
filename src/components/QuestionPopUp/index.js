import React, {useState} from 'react';
import closeIcon from "../../assets/images/close.svg";
import {connect} from "react-redux";

function QuestionPopUp (props) {
    const { currentQuestion } = props.utilsReducer;

    const editMode = Object.keys(currentQuestion).length !== 0;

    const [question, setQuestion] = useState(editMode ? currentQuestion.question : '');
    const [answer, setAnswer] = useState(editMode ? currentQuestion.answer : '');
    const [counter, setCounter] = useState(null);
    const [delay, setDelay] = useState(false);

    const emptyQuestion = question.trim().length === 0;

    function togglePopUp() {
        props.dispatch({
            type: 'TOGGLE_QUESTION_MODAL'
        });
    }

    React.useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        counter === 0 && (editMode ? updateQuestion() : addQuestion());
    }, [counter]);

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
