import React from 'react';
import {connect} from "react-redux";
import infoIcon from "../../assets/images/info.svg";

/**
 * @namespace SectionAddQA
 */
/**
 * Generates a section of the page with a button for adding questions and answers.
 * @author Elena Manevska <96manevskaelena@gmail.com>
 * @constructor
 * @memberOf SectionAddQA
 * @param {object} props - Props object.
 * @param {function} props.utilsReducer - Reducer containing actions for updating the state of modal windows.
 * @return {object} - React Element
 */
function SectionAddQA (props) {

    /**
     * Dispatches an action to the utilsReducer for changing the state to show the Add New Question Pop-up.
     *
     * @memberOf SectionAddQA
     * @returns {void}
     */
    function togglePopUp(e) {
        e.stopPropagation();
        props.dispatch({
            type: 'TOGGLE_QUESTION_MODAL'
        });
    }

    return(
        <React.Fragment>
            <header className={'add-header'}>
                <h1>
                    Add new question
                    <div className="tooltip">
                        <img src={infoIcon} alt="Info"/>
                        <p>Help us and add more questions</p>
                    </div>
                </h1>
                <button onClick={togglePopUp}>Add new question</button>
            </header>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    utilsReducer: state.utilsReducer
});

export default connect(mapStateToProps)(SectionAddQA)
