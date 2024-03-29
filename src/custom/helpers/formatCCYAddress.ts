
import bch = require('bitcore-lib-cash');

export const formatCCYAddress = (currency: string, address: string): string => {
    if (address) {
        if (currency === 'BCH') {
            if (bch.Address.isValid(address)) {
                return bch.Address(address).toString(bch.Address.CashAddrFormat);
            } else {
                return '';
            }
        } else {
            return address;
        }
    } else {
        return '';
    }
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/helpers/formatCCYAddress.ts
