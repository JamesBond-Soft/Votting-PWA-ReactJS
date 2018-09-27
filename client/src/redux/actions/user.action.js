import { userConstants } from '../constants';

import {
    callApi
} from '../../utils/apiUtils';

import {LOGIN, LOGOUT} from '../../utils/endpoints';

function loginRequest(user) {
    return {
        type: LOGIN_REQUEST,
        user
    };
}

function loginSuccess (data) {
    const idToken = data['token'];
    setIdToken(idToken);
    saveUserProfile(data);
    return {
        type: LOGIN_SUCCESS,
        error : null,
        token : idToken,
        user : data
    }
}

function loginError(errorMsg) {
    return {
        type: LOGIN_ERROR,
        error : errorMsg
    } 
}
function loginFailure (error) {
    let errMsg = 'Connection failed!';
    return {
        type : LOGIN_FAILURE,
        error: errMsg
    };
}

export function login (username, password) {
    const config = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            username   : username,
            password   : password,
            app_version: app_version,
            app_type   : 2
        })
    };

    return callApi(
        LOGIN,
        config,
        loginRequest(username),
        loginSuccess,
        loginError,
        loginFailure
    );
}
