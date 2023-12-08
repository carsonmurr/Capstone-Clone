import { GET_DISCUSSIONS, ADD_DISCUSSION, GET_MESSAGES, ADD_MESSAGE } from '../actions/types';

const initialState = {
    discussions: [],
    activeDiscussion: {
        messages: [], // Make sure this is initialized as an array
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DISCUSSIONS:
            return {
                ...state,
                discussions: action.payload,
            };
        case ADD_DISCUSSION:
            return {
                ...state,
                discussions: [...state.discussions, action.payload],
            };
        case GET_MESSAGES:
            return {
                ...state,
                activeDiscussion: {
                    ...state.activeDiscussion,
                    messages: action.payload.messages,
                },
            };
        case ADD_MESSAGE:
            return {
                ...state,
                activeDiscussion: {
                    ...state.activeDiscussion,
                    messages: [...state.activeDiscussion.messages, action.payload],
                },
            };
        default:
            return state;
    }
}
