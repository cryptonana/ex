import {
    CURRENCIES_DATA,
    CURRENCIES_ERROR,
    CURRENCIES_FETCH,
} from './constants';
import { Currency } from './types';

export interface CurrenciesFetch {
    type: typeof CURRENCIES_FETCH;
}

export interface CurrenciesData {
    type: typeof CURRENCIES_DATA;
    payload: Currency[];
}

export interface CurrenciesError {
    type: typeof CURRENCIES_ERROR;
}

export type CurrenciesAction =
    CurrenciesFetch
    | CurrenciesData
    | CurrenciesError;

export const currenciesFetch = (): CurrenciesFetch => ({
    type: CURRENCIES_FETCH,
});

export const currenciesData = (payload: CurrenciesData['payload']): CurrenciesData => ({
    type: CURRENCIES_DATA,
    payload,
});

export const currenciesError = (): CurrenciesError => ({
    type: CURRENCIES_ERROR,
});


// WEBPACK FOOTER //
// src/drone/src/src/modules/public/currencies/actions.ts
