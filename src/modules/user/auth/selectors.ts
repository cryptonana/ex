import { RootState } from '../../index';
import { AuthState } from './reducer';

export const selectSignInRequire2FA = (state: RootState): AuthState['require2FA'] =>
    state.user.auth.require2FA;

export const selectSignUpRequireVerification = (state: RootState): AuthState['requireVerification'] =>
    state.user.auth.requireVerification;

export const selectEmailVerified = (state: RootState): AuthState['emailVerified'] =>
    state.user.auth.emailVerified;


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/auth/selectors.ts
