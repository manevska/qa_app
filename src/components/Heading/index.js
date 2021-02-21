import React from 'react';
import {connect} from "react-redux";
/**
 * @namespace Heading
 */
/**
 * Generates a section for showing the name of the app and a counter for how many questions we are showing.
 * @author Elena Manevska <96manevskaelena@gmail.com>
 * @constructor
 * @memberOf Heading
 * @param {object} props - Props object.
 * @param {function} props.dataReducer - Reducer containing actions for updating the state of questions data.
 * @param {object} props.dataReducer.questions - List of all questions.
 * @return {object} - React Element
 */
function Heading (props) {
    const { questions } = props.dataReducer;
    return(
        <aside>
            <h1>Q&A</h1>
            <p>Here you can find {questions.length ? questions.length + (questions.length === 1 ? ' question' : ' questions') : 'no questions'}.
                Feel free to create your own questions!</p>
        </aside>
    );
}

const mapStateToProps = state => ({
    dataReducer: state.dataReducer
});

export default connect(mapStateToProps)(Heading)
