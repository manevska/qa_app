import React from 'react';
import {connect} from "react-redux";

import infoIcon from "../../assets/images/info.svg";

function SectionAddQA (props) {

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
