import { GET_DISCUSSION, CREATE_DISCUSSION, POST_SENT} from '../actions/discussion';

const initialState = {
    msgs: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DISCUSSION:
            return {
                ...state,
                msgs: action.payload,
            }
        case CREATE_DISCUSSION:
            return{
                ...state,
                msgs: action.payload,
            }
        case POST_SENT:
            return {
                ...state,
                msgs: [...state.msgs, action.payload],
            }
        case CREATE_DISCUSSIONUSER:
            return {
                ...state,
                du: [...state.du, action.payload]
            }
        default:
            return {
                ...state,
            }
    }
}