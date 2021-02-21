import React from 'react';
import {connect} from "react-redux";

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
