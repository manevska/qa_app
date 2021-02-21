import React from "react";
import { render, screen } from './test-utils'
import dataReducer, {REMOVE_ALL, REMOVE_QUESTION, SORT_ALL, ADD_QUESTION, UPDATE_QUESTION } from './store/dataReducer';
import utilsReducer, {TOGGLE_CONFIRMATION_MODAL, TOGGLE_QUESTION_MODAL} from './store/utilsReducer';
import SectionListQA from "./components/SectionListQA";
import '@testing-library/jest-dom'

describe('data reducer', () => {
  it('should return the initial state', () => {
    expect(dataReducer(undefined, {})).toEqual(
        {
          questions: [{
            id: 12345,
            question: 'How to add a question?',
            answer: 'Just click on the button below!'
          }]
        }
    )
  });

  it('should handle ADD_QUESTION', () => {
    expect(
        dataReducer({
          questions: [{
            id: 12345,
            question: 'How to add a question?',
            answer: 'Just click on the button below!'
          }]
        }, {
          type: ADD_QUESTION,
          payload: {
            id: 54321,
            question: 'Is this a test question?',
            answer: 'Yes!'
          }
        })
    ).toEqual(
        {
          questions: [{
            id: 12345,
            question: 'How to add a question?',
            answer: 'Just click on the button below!'
          },{
            id: 54321,
            question: 'Is this a test question?',
            answer: 'Yes!'
          }],
        }
    );
  });

  it('should handle UPDATE_QUESTION', () => {
    expect(
        dataReducer({
          questions: [{
            id: 12345,
            question: 'How to add a question?',
            answer: 'Just click on the button below!'
          },{
            id: 54321,
            question: 'Is this a test question?',
            answer: 'Yes!'
          }],
        }, {
          type: UPDATE_QUESTION,
          payload: {
            id: 54321,
            question: 'Is this an updated test question?',
            answer: 'Yes!'
          }
        })
    ).toEqual(
        {
          questions: [{
            id: 12345,
            question: 'How to add a question?',
            answer: 'Just click on the button below!'
          },{
            id: 54321,
            question: 'Is this an updated test question?',
            answer: 'Yes!'
          }],
        }
    );
  });

  it('should handle REMOVE_QUESTION', () => {
    expect(
        dataReducer({
          questions: [{
            id: 12345,
            question: 'How to add a question?',
            answer: 'Just click on the button below!'
          },{
            id: 54321,
            question: 'Is this a test question?',
            answer: 'Yes!'
          }],
        }, {
          type: REMOVE_QUESTION,
          payload: {
            id: 54321,
            question: 'Is this a test question?',
            answer: 'Yes!'
          }
        })
    ).toEqual(
        {
          questions: [{
            id: 12345,
            question: 'How to add a question?',
            answer: 'Just click on the button below!'
          }],
        }
    );
  });

  it('should handle REMOVE_ALL', () => {
    expect(
        dataReducer({
          questions: [{
            id: 12345,
            question: 'How to add a question?',
            answer: 'Just click on the button below!'
          },{
            id: 54321,
            question: 'Is this a test question?',
            answer: 'Yes!'
          }],
        }, {
          type: REMOVE_ALL
        })
    ).toEqual(
        {
          questions: [],
        }
    );
  });

  it('should handle SORT_ALL', () => {
    expect(
        dataReducer({
          questions: [{
            id: 12345,
            question: 'Question C?',
            answer: 'Irrelevant answer'
          },{
            id: 54321,
            question: 'Question A?',
            answer: 'Another irrelevant answer'
          },{
            id: 23451,
            question: 'Question B?',
            answer: 'Irrelevant!'
          }],
        }, {
          type: SORT_ALL
        })
    ).toEqual(
        {
          questions: [{
            id: 54321,
            question: 'Question A?',
            answer: 'Another irrelevant answer'
          },{
            id: 23451,
            question: 'Question B?',
            answer: 'Irrelevant!'
          },{
            id: 12345,
            question: 'Question C?',
            answer: 'Irrelevant answer'
          }],
        }
    );
  });
});

describe('utils reducer', () => {
  it('should return the initial state', () => {
    expect(utilsReducer(undefined, {})).toEqual(
        {
          showQuestionModal: false,
          currentQuestion: {},
          showConfirmationModal: false
        }
    )
  });

  it('should handle TOGGLE_QUESTION_MODAL', () => {
    expect(
        utilsReducer({
          showQuestionModal: false,
          currentQuestion: {},
          showConfirmationModal: false
        }, {
          type: TOGGLE_QUESTION_MODAL
        })
    ).toEqual(
        {
          showQuestionModal: true,
          currentQuestion: {},
          showConfirmationModal: false
        }
    );
  });

  it('should handle TOGGLE_CONFIRMATION_MODAL', () => {
    expect(
        utilsReducer({
          showQuestionModal: false,
          currentQuestion: {},
          showConfirmationModal: false
        }, {
          type: TOGGLE_CONFIRMATION_MODAL
        })
    ).toEqual(
        {
          showQuestionModal: false,
          currentQuestion: {},
          showConfirmationModal: true
        }
    );
  })
});

it('Renders the list of q&a with the initial question.', () => {
  render(<SectionListQA />, { initialState: { dataReducer: {questions: [{
          id: 12345,
          question: 'How to add a question?',
          answer: 'Just click on the button below!'
        }]}, utilsReducer: {
        currentQuestion: {},
        showConfirmationModal: false,
        showQuestionModal: false
      }}
  });
  expect(screen.getByText(/How to add a question?/i)).toBeInTheDocument()
});
