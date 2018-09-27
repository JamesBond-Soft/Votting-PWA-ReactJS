import { userConstants } from '../constants';

/* import {
    loadIdToken,
    loadUserProfile
} from '../../utils/apiUtils'; */

const initialState = {
    user      : null,
    token     : null,
    loggingIn : false,
    loggingOut: false,
    loginError: null
};


export default function user (state = initialState, action = {}) {
    switch (action.type) {
       /*  case FORCE_LOGOUT:
            return Object.assign({},state, {
                token     : null
            }) */
        case userConstants.LOGIN_REQUEST:
            return Object.assign({},state, {
                loggingIn : true,
            });
        case userConstants.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loggingIn : false,
                token     : action.token,
                loginError: action.error,
                user      : action.user
            });
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                loggingIn : false,
                loginError: action.error
            };
        case userConstants.LOGIN_ERROR:
            return {
                ...state,
                loggingIn : false,
                loginError: action.error
            };
        case userConstants.LOGOUT_REQUEST:
            return {
                ...state,
                loggingOut: true
            };
      /*   case LOGOUT_SUCCESS:
            return {
                ...state,
                token     : null,
                loggingOut: false,
                user      : null,
            }; */
        case userConstants.LOGOUT_FAILURE:
            return {
                ...state,
                loggingOut : false,
                logoutError: action.error
            };
        default:
            return state;
    }
}