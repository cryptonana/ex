import { CommonError } from '../../types';
import {
    RECENT_TRADES_DATA,
    RECENT_TRADES_ERROR,
    RECENT_TRADES_FETCH,
    RECENT_TRADES_PUSH,
} from './constants';

import { PublicTrade } from '../../user/history';
import { Market } from '../markets';
import { PublicTradeEvent } from './types';

export interface RecentTradesFetch {
    type: typeof RECENT_TRADES_FETCH;
    payload: Market;
}

export interface RecentTradesData {
    type: typeof RECENT_TRADES_DATA;
    payload: PublicTrade[];
}

export interface RecentTradesError {
    type: typeof RECENT_TRADES_ERROR;
    payload?: CommonError;
}

export interface RecentTradesPush {
    type: typeof RECENT_TRADES_PUSH;
    payload: {
        trades: PublicTradeEvent[],
        market: string,
    };
}

export type RecentTradesActions =
    RecentTradesFetch
    | RecentTradesError
    | RecentTradesData
    | RecentTradesPush;

export const recentTradesFetch = (payload: RecentTradesFetch['payload']): RecentTradesFetch => ({
    type: RECENT_TRADES_FETCH,
    payload,
});

export const recentTradesData = (payload: RecentTradesData['payload']): RecentTradesData => ({
    type: RECENT_TRADES_DATA,
    payload,
});

export const recentTradesPush = (payload: RecentTradesPush['payload']): RecentTradesPush => ({
    type: RECENT_TRADES_PUSH,
    payload,
});

export const recentTradesError = (payload: RecentTradesError['payload']): RecentTradesError => ({
    type: RECENT_TRADES_ERROR,
    payload,
});


// WEBPACK FOOTER //
// src/drone/src/src/modules/public/recentTrades/actions.ts
