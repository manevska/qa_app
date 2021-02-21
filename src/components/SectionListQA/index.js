import React from 'react';
import infoIcon from "../../assets/images/info.svg";
import {connect} from "react-redux";
import Question from '../Question';

function SectionListQA (props) {
    const { questions } = props.dataReducer;

    function toggleConfirmationPopUp() {
        props.dispatch({
            type: 'TOGGLE_CONFIRMATION_MODAL',
            payload: {}
        });
    }

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
                <button onClick={sortQuestions}>Sort</button>
                <button onClick={toggleConfirmationPopUp}>Delete all</button>
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
