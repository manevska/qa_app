import React from 'react';
import {connect} from "react-redux";
import './assets/style.scss';
import Heading from './components/Heading';
import SectionAddQA from './components/SectionAddQA';
import SectionListQA from './components/SectionListQA';
import QuestionPopup from './components/QuestionPopUp';
import ConfirmationPopUp from "./components/ConfirmationPopUp";

/**
 * Generates a Q&A App
 * @author Elena Manevska <96manevskaelena@gmail.com>
 */
function App(props) {
    const { utilsReducer } = props;

    return (
        <div className='wrapper'>
            <Heading/>
            <main>
                <SectionListQA/>
                <SectionAddQA/>
            </main>
            {
                utilsReducer.showQuestionModal &&
                <QuestionPopup/>
            }
            {
                utilsReducer.showConfirmationModal &&
                <ConfirmationPopUp/>
            }
        </div>
    );
}

const mapStateToProps = state => ({
    utilsReducer: state.utilsReducer
});

export default connect(mapStateToProps)(App)
