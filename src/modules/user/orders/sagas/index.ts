// tslint:disable-next-line
import { takeLatest } from 'redux-saga/effects';
import { ORDER_EXECUTE_FETCH } from '../constants';
import { ordersExecuteSaga } from './ordersExecuteSaga';


export function* rootOrdersSaga() {
    yield takeLatest(ORDER_EXECUTE_FETCH, ordersExecuteSaga);
}


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/orders/sagas/index.ts
