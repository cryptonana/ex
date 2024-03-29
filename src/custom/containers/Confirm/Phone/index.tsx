import cr from 'classnames';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import {
    connect,
    MapDispatchToPropsFunction,
} from 'react-redux';
import { RootState } from '../../../../modules';
import {
    resendCode,
    selectVerifyPhoneSuccess,
    sendCode,
    verifyPhone,
} from '../../../../modules/user/kyc/phone';
import { changeUserLevel } from '../../../../modules/user/profile';
import {
    Button,
} from '../../../../openware';

interface ReduxProps {
    verifyPhoneSuccess?: string;
}

interface OnChangeEvent {
    target: {
        value: string;
    };
}

interface PhoneState {
    phoneNumber: string;
    phoneNumberFocused: boolean;
    confirmationCode: string;
    confirmationCodeFocused: boolean;
    resendCode: boolean;
}

interface DispatchProps {
    resendCode: typeof resendCode;
    sendCode: typeof sendCode;
    verifyPhone: typeof verifyPhone;
    changeUserLevel: typeof changeUserLevel;
}

type Props = ReduxProps & DispatchProps & InjectedIntlProps;

class PhoneComponent extends React.Component<Props, PhoneState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            phoneNumber: '',
            phoneNumberFocused: false,
            confirmationCode: '',
            confirmationCodeFocused: false,
            resendCode: false,
        };
    }

    public translate = (e: string) => {
        return this.props.intl.formatMessage({ id: e });
    };

    public componentDidUpdate(prev: Props) {
        if (!prev.verifyPhoneSuccess && this.props.verifyPhoneSuccess) {
            this.props.changeUserLevel({ level: 2 });
        }
    }

    public render() {
        const {
            phoneNumber,
            phoneNumberFocused,
            confirmationCode,
            confirmationCodeFocused,
        } = this.state;
        const {
            verifyPhoneSuccess,
        } = this.props;

        const phoneNumberFocusedClass = cr('pg-confirm__content-phone-col-content', {
            'pg-confirm__content-phone-col-content--focused': phoneNumberFocused,
        });

        const confirmationCodeFocusedClass = cr('pg-confirm__content-phone-col-content', {
            'pg-confirm__content-phone-col-content--focused': confirmationCodeFocused,
        });

        return (
            <div className="pg-confirm__content-phone">
                <div className="pg-confirm__content-phone-col">
                    <div className="pg-confirm__content-phone-col-text">
                        <FormattedMessage id={'page.body.kyc.phone.phoneNumber'}/>
                    </div>
                    <fieldset className={phoneNumberFocusedClass}>
                        <input
                            className="pg-confirm__content-phone-col-content-number"
                            type="string"
                            placeholder={this.translate('page.body.kyc.phone.phoneNumber')}
                            value={phoneNumber}
                            onClick={this.addPlusSignToPhoneNumber}
                            onChange={this.handleChangePhoneNumber}
                            onFocus={this.handleFieldFocus('phoneNumber')}
                            onBlur={this.handleFieldFocus('phoneNumber')}
                            onKeyPress={this.handleSendEnterPress}
                            autoFocus={true}
                        />
                        <button
                            className={phoneNumber ? 'pg-confirm__content-phone-col-content-send' : 'pg-confirm__content-phone-col-content-send--disabled'}
                            type="button"
                            onClick={this.handleSendCode}
                        >
                            {this.state.resendCode ? this.translate('page.body.kyc.phone.resend') : this.translate('page.body.kyc.phone.send')}
                        </button>
                    </fieldset>
                </div>
                <div className="pg-confirm__content-phone-col">
                    <div className="pg-confirm__content-phone-col-text">
                        <FormattedMessage id={'page.body.kyc.phone.code'}/>
                    </div>
                    <fieldset className={confirmationCodeFocusedClass}>
                        <input
                            className="pg-confirm__content-phone-col-content-number"
                            type="string"
                            placeholder={this.translate('page.body.kyc.phone.enterCode')}
                            value={confirmationCode}
                            onChange={this.handleChangeConfirmationCode}
                            onFocus={this.handleFieldFocus('confirmationCode')}
                            onBlur={this.handleFieldFocus('confirmationCode')}
                            onKeyPress={this.handleConfirmEnterPress}
                        />
                    </fieldset>
                </div>
                {verifyPhoneSuccess && <p className="pg-confirm__success">{verifyPhoneSuccess}</p>}
                <div className="pg-confirm__content-deep">
                    <Button
                        className="pg-confirm__content-phone-deep-button"
                        label={this.translate('page.body.kyc.next')}
                        onClick={this.confirmPhone}
                    />
                </div>
            </div>
        );
    }

    private handleFieldFocus = (field: string) => {
        return () => {
            switch (field) {
                case 'phoneNumber':
                    this.addPlusSignToPhoneNumber();
                    this.setState({
                        phoneNumberFocused: !this.state.phoneNumberFocused,
                    });
                    break;
                case 'confirmationCode':
                    this.setState({
                        confirmationCodeFocused: !this.state.confirmationCodeFocused,
                    });
                    break;
                default:
                    break;
            }
        };
    }

    private handleConfirmEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.confirmPhone();
        }
    }

    private handleSendEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSendCode();
        }
    }

    private confirmPhone = () => {
        const requestProps = {
            phone_number: String(this.state.phoneNumber),
            verification_code: String(this.state.confirmationCode),
        };
        this.props.verifyPhone(requestProps);
    }

    private addPlusSignToPhoneNumber = () => {
        if (this.state.phoneNumber.length === 0) {
            this.setState({
                phoneNumber: '+',
            });
        }
    }

    private handleChangePhoneNumber = (e: OnChangeEvent) => {
        if (this.inputPhoneNumber(e)) {
            this.setState({
                phoneNumber: e.target.value,
                resendCode: false,
            });
        }
    }

    private handleChangeConfirmationCode = (e: OnChangeEvent) => {
        if (this.inputConfirmationCode(e)) {
            this.setState({
                confirmationCode: e.target.value,
            });
        }
    };

    private inputPhoneNumber = (e: OnChangeEvent) => {
        const convertedText = e.target.value.trim();
        const condition = new RegExp('^\\+\\d*?$');
        return condition.test(convertedText);
    }

    private inputConfirmationCode = (e: OnChangeEvent) => {
        const convertedText = e.target.value.trim();
        const condition = new RegExp('^\\d*?$');
        return condition.test(convertedText);
    }

    private handleSendCode = () => {
        const requestProps = {
            phone_number: String(this.state.phoneNumber),
        };
        if (!this.state.resendCode) {
            this.props.sendCode(requestProps);
            this.setState({
                resendCode: true,
            });
        } else {
            this.props.resendCode(requestProps);
        }
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    verifyPhoneSuccess: selectVerifyPhoneSuccess(state),
});

const mapDispatchProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        resendCode: phone => dispatch(resendCode(phone)),
        sendCode: phone => dispatch(sendCode(phone)),
        verifyPhone: payload => dispatch(verifyPhone(payload)),
        changeUserLevel: payload => dispatch(changeUserLevel(payload)),
    });

// tslint:disable-next-line
export const Phone = injectIntl(connect(mapStateToProps, mapDispatchProps)(PhoneComponent) as any);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/Confirm/Phone/index.tsx
