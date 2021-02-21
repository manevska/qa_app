import React from 'react';
import infoIcon from "../../assets/images/info.svg";
import {connect} from "react-redux";
import Question from '../Question';

/**
 * @namespace SectionListQA
 */
/**
 * Generates a section of the page for listing added questions and answers.
 * @author Elena Manevska <96manevskaelena@gmail.com>
 * @constructor
 * @memberOf SectionListQA
 * @param {object} props - Props object.
 * @param {function} props.dataReducer - Reducer containing actions for updating the state of questions data.
 * @param {function} props.utilsReducer - Reducer containing actions for updating the state of modal windows.
 * @return {object} - React Element
 */
function SectionListQA (props) {
    const { questions } = props.dataReducer;

    /**
     * Dispatches an action to the utilsReducer for changing the state to show the Confirmation Pop-up.
     *
     * @memberOf SectionListQA
     * @returns {void}
     */
    function toggleConfirmationPopUp() {
        props.dispatch({
            type: 'TOGGLE_CONFIRMATION_MODAL',
            payload: {}
        });
    }

    /**
     * Dispatches an action to the dataReducer for sorting the questions in alphabetical order.
     *
     * @memberOf SectionListQA
     * @returns {void}
     */
    function sortQuestions() {
        props.dispatch({
            type: 'SORT_ALL'
        });
    }

    return(
        <React.Fragment>
            <header>
                <h1>
                    Let us help you
                    <div className="tooltip">
                        <img src={infoIcon} alt="Info"/>
                        <p>Let us help you find the answers!</p>
                    </div>
                </h1>
                <button id='sort' onClick={sortQuestions}>Sort</button>
                <button id='delete' onClick={toggleConfirmationPopUp}>Delete all</button>
            </header>
            <div className={'questions-wrapper'}>
                {
                    questions.length === 0 ?
                        <div className={'questions-wrapper--empty'}>
                            <h2>Ooops! No questions found. Add new questions.</h2>
                        </div>
                        :
                        questions.map((item) =>
                            <Question question={item} key={item.id}/>
                        )
                }
            </div>

        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    utilsReducer: state.utilsReducer,
    dataReducer: state.dataReducer
});

export default connect(mapStateToProps)(SectionListQA)
