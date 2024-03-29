import { RootState } from '../../';
import { PasswordState } from './reducer';

export const selectForgotPasswordSuccess = (state: RootState): PasswordState['forgotPasswordRequested'] =>
    state.user.password.forgotPasswordRequested;

export const selectChangeForgotPasswordSuccess = (state: RootState): PasswordState['forgotPasswordChanged'] =>
    state.user.password.forgotPasswordChanged;


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/password/selectors.ts
