// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { signUpError, SignUpFetch, signUpRequireVerification } from '../actions';

const signUpConfig: RequestOptions = {
    apiVersion: 'barong',
};

export function* signUpSaga(action: SignUpFetch) {
    try {
        yield call(API.post(signUpConfig), '/identity/users', action.payload);
        yield put(signUpRequireVerification({ requireVerification: true }));
    } catch (error) {
        yield put(signUpError(error));
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/auth/sagas/signUpSaga.ts
