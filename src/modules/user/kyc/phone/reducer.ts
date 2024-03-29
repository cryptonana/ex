import { CommonError } from '../../../types';
import { PhoneAction } from './actions';
import {
    PHONE_RESEND_CODE_DATA,
    PHONE_RESEND_CODE_ERROR,
    PHONE_RESEND_CODE_FETCH,
    PHONE_SEND_CODE_DATA,
    PHONE_SEND_CODE_ERROR,
    PHONE_SEND_CODE_FETCH,
    PHONE_VERIFY_DATA,
    PHONE_VERIFY_ERROR,
    PHONE_VERIFY_FETCH,
} from './constants';

export interface PhoneState {
    codeSend: boolean;
    error?: CommonError;
    successMessage?: string;
}

export const initialPhoneState: PhoneState = {
    codeSend: false,
};

export const phoneReducer = (state = initialPhoneState, action: PhoneAction) => {
    switch (action.type) {
        case PHONE_SEND_CODE_FETCH:
            return {
                ...state,
                codeSend: false,
                error: undefined,
                successMessage: undefined,
            };
        case PHONE_SEND_CODE_DATA:
            return {
                ...state,
                codeSend: true,
            };
        case PHONE_SEND_CODE_ERROR:
            return {
                codeSend: false,
                error: action.payload,
            };
        case PHONE_VERIFY_DATA:
            return {
                ...state,
                successMessage: action.payload.message,
                error: undefined,
            };
        case PHONE_VERIFY_ERROR:
            return {
                codeSend: false,
                error: action.payload,
            };
        case PHONE_VERIFY_FETCH:
        case PHONE_RESEND_CODE_FETCH:
            return {
                ...state,
                codeSend: false,
                error: undefined,
                successMessage: undefined,
            };
        case PHONE_RESEND_CODE_DATA:
            return {
                ...state,
                codeSend: true,
            };

        case PHONE_RESEND_CODE_ERROR:
            return {
                codeSend: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/kyc/phone/reducer.ts
