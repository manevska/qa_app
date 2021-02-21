export const ADD_QUESTION = 'ADD_QUESTION';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const REMOVE_ALL = 'REMOVE_ALL';
export const SORT_ALL = 'SORT_ALL';


const initialState = {
    questions: [{
        id: 12345,
        question: 'How to add a question?',
        answer: 'Just click on the button below!'
    }],
};
export default function dataReducer (state = initialState, { type, payload }) {
    switch (type) {
        case ADD_QUESTION: {
            return { ...state,
                questions: [...state.questions, payload]
            }
        }
        case REMOVE_QUESTION: {
            return { ...state,
                questions: state.questions.filter(question => question.id !== payload.id)
            }
        }

        case UPDATE_QUESTION: {
            const index = state.questions.findIndex(question => question.id === payload.id);
            const newArray = [...state.questions];
            newArray[index] = payload;
            return {
                ...state,
                questions: newArray,
            }
        }

        case REMOVE_ALL: {
            return { ...state,
                questions: []
            }
        }

        case SORT_ALL: {
            return { ...state,
                questions: state.questions.slice().sort((a, b) => a.question.localeCompare(b.question))
            }
        }

        default:
            return state
    }
}
