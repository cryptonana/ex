import { ChangeColorThemeAction } from './actions';
import { CHANGE_COLOR_THEME } from './constants';

export interface ColorThemeState {
    color: string;
}

const currentColorTheme: string = localStorage.getItem('colorTheme') || 'dark';

export const initialChangeColorThemeState: ColorThemeState = {
    color: currentColorTheme,
};

export const changeColorThemeReducer = (state = initialChangeColorThemeState, action: ChangeColorThemeAction) => {
    switch (action.type) {
        case CHANGE_COLOR_THEME:
            localStorage.setItem('colorTheme', action.payload);
            return {
                color: action.payload,
             };
        default:
            return state;
    }
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/modules/public/colorTheme/reducer.ts
