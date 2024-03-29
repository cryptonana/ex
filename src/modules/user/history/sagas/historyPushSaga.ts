// tslint:disable-next-line
import { put, select } from 'redux-saga/effects';
import { defaultStorageLimit } from '../../../../api';
import { getTimezone, localeDate } from '../../../../helpers';
import { kindToMakerType } from '../../../helpers';
import { HistoryPush, pushHistoryFinish } from '../actions';
import { selectHistory } from '../selectors';
import { PrivateTrade, PrivateTradeEvent } from '../types';

export function* historyPushSaga(action: HistoryPush) {
    const tradeEventToTrade = (tradeEvent: PrivateTradeEvent): PrivateTrade => {
        const { id, at, market, kind, price, volume } = tradeEvent;
        const funds = Number(price) * Number(volume);
        return {
            id,
            price,
            volume,
            funds: `${funds}`,
            market,
            created_at: localeDate(at, 'fullDate', getTimezone()),
            taker_type: kindToMakerType(kind),
        };
    };

    const actualList = yield select(selectHistory);
    const updatedTrades = [...[tradeEventToTrade(action.payload)], ...actualList].slice(0, defaultStorageLimit());

    yield put(pushHistoryFinish(updatedTrades));
}


// WEBPACK FOOTER //
// src/drone/src/src/modules/user/history/sagas/historyPushSaga.ts
