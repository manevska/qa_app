export const TOGGLE_QUESTION_MODAL = 'TOGGLE_QUESTION_MODAL';
export const TOGGLE_CONFIRMATION_MODAL = 'TOGGLE_CONFIRMATION_MODAL';

const initialState = {
    showQuestionModal: false,
    currentQuestion: {},
    showConfirmationModal: false
};
export default function utilsReducer (state = initialState, { type, payload }) {
    switch (type) {
        case TOGGLE_QUESTION_MODAL: {
            return { ...state,
                showQuestionModal: !state.showQuestionModal,
                currentQuestion: payload ? payload : {}
            }
        }

        case TOGGLE_CONFIRMATION_MODAL: {
            return { ...state,
                showConfirmationModal: !state.showConfirmationModal,
                currentQuestion: payload ? payload : {}
            }
        }

        default:
            return state
    }
}
