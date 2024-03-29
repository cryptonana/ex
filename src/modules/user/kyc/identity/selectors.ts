import { RootState } from '../../../index';
import { IdentityState } from './reducer';

export const selectSendIdentitySuccess = (state: RootState): IdentityState['success'] =>
    state.user.identity.success;

export const selectSendIdentityError = (state: RootState): IdentityState['error'] =>
    state.user.identity.error;


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/kyc/identity/selectors.ts
