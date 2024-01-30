import React, {useEffect, useState} from "react";
import {checkPayment, createPayment} from "../../api.ts";
import getMobile from "../../getMobile";
import {useHistory} from "react-router-dom";
import {getUrlParams} from "../../utils";

let urlRedirect: string;

declare let _tmr: any;
declare let ym: any;

type PayCloudProps = {
    successPay: (urlRedirect: string) => void;
    closePay: () => void,
    package_id: number,
    texts: string[],
    reachGoalEkBuySuccess?: (namePage: string) => void,
    namePage: string,
    package_name: string,
    cost: number,
    pathname?: string
};

type PaymentResponse = {
    amount: number;
    currency: string;
    accountId: number;
    invoiceId: number;
    description: string;
    data: {
        package_id: number;
        profile_id: string;
        purchase_id: number;
        store_product_id: string;
        region_id: number;
        app_platform: string;
        comment: string;
    };
    status: string;
    message: string | null;
};

const PayCloud: React.FunctionComponent<PayCloudProps> = (props: PayCloudProps) => {
    const [isData, setIsData] = useState(undefined);
    const history = useHistory();
    useEffect(() => {

        createPayment(props.package_id, "widget_cloud")
            .then(async (res: PaymentResponse) => {
                setIsData(res);
            });
        if (props.pathname) {
            let indexUrl = location.href.indexOf(props.pathname);
            urlRedirect = location.href.substring(0, indexUrl);
        } else {
            urlRedirect = window.location.href;
        }

        if (getMobile() !== "unknown") {
            if (localStorage.phone) {
                history.replace({
                    search: "?" + getUrlParams() + "&auth=" + localStorage.getItem("access_token") + "&refresh=" + localStorage.getItem("refresh_token") + "&profile_id=" + localStorage.getItem("profile_id") + "&phone=" + localStorage.getItem("login"),
                });
            } else {
                history.replace({
                    search: "?" + getUrlParams() + "&auth=" + localStorage.getItem("access_token") + "&refresh=" + localStorage.getItem("refresh_token") + "&profile_id=" + localStorage.getItem("profile_id"),
                });
            }
        }
    }, []);

    useEffect(() => {
        if (isData) {
            initWidget();
        }
    }, [isData]);

    function initWidget() {
        // @ts-ignore
        let payments = new cp.CloudPayments({
            language: "ru-RU",
            email: "",

            mirPaySupport: true,
            yandexPaySupport: true,

            tinkoffInstallmentSupport: getMobile() !== "unknown",
            tinkoffPaySupport: getMobile() !== "unknown",
            applePaySupport: false,
            googlePaySupport: false,
            masterPassSupport: false,
            sbpSupport: false,
        });

        payments.pay("charge", {
                publicId: isData.store_id,
                description: props.package_name + "\n" + String(props.texts[0]) + "\n" + String(props.texts[1]) + "\n" + String(props.texts[2]),
                amount: isData.amount,
                currency: isData.currency,
                invoiceId: isData.invoiceId,
                accountId: isData.accountId,
                skin: "modern",
                requireEmail: false,
                data: isData.data,
                configuration: {
                    common: {
                        successRedirectUrl: urlRedirect, // адреса для перенаправления
                        failRedirectUrl: window.location.href, // при оплате по Tinkoff Pay
                    }
                },
            },
            {
                onSuccess: function (options) {
                    ym(String(), 'reachGoal', 'web.payment-success');

                    //
                    if (props.namePage) {

                        let eventParams = {
                            userid: localStorage.getItem("profile_id"),
                            package_name: props.package_name,
                            cost: props.cost
                        }

                        if (props.namePage === "EK_BUY_SUCCESS" || props.namePage === "PLAYER_BUY_SUCCESS") {
                            props.reachGoalEkBuySuccess(props.namePage);
                        }

                        if (props.namePage === "SUBSCRIBE") {
                            _tmr.push({
                                type: 'reachGoal',
                                userid: localStorage.getItem("profile_id"),
                                goal: props.namePage + '_BUY_SUCCESS',
                                params: eventParams
                            });
                        }

                        if (props.namePage === "MOVIE_PAYWALL") {
                            _tmr.push({
                                id: '',
                                type: 'reachGoal',
                                userid: localStorage.getItem("profile_id"),
                                goal: props.namePage + '_BUY_SUCCESS',
                                params: eventParams
                            });
                        }

                        if (props.namePage === "MOVIE_PAYWALL_SPINNER") {
                            _tmr.push({
                                id: '',
                                type: 'reachGoal',
                                userid: localStorage.getItem("profile_id"),
                                goal: props.namePage + '_BUY_SUCCESS',
                                params: eventParams
                            });
                        }
                    }
                    //
                    props.successPay(urlRedirect);
                },
                onFail: function (reason: string, options: any) {
                    ym(String(), 'reachGoal', 'web.payment-fail');
                    if (reason === "User has cancelled") {
                        props.closePay();
                    }
                },
                onComplete: function (paymentResult, options) {
                },
            },
        ).then(function (widgetResult: { type: string; data: { transactionId: any; }; }) {
            if (widgetResult.type !== "cancel") {
                let countRetries: number;
                checkPayment(widgetResult.data.transactionId, "widget_cloud")
                    .then(async (res: { status: string; retries: number; }) => {
                        if (res.status === "confirmed" || countRetries < 1) {
                            if (window.location.href === urlRedirect) {
                                window.location.reload();
                            } else {
                                window.location.href = urlRedirect;
                            }
                        } else {
                            if (countRetries === undefined) {
                                countRetries = res.retries;
                            }
                            countRetries--;
                        }
                    });
            }
        }).catch(function (error: any) {
            console.log('error', error);
        });
    }

    return <div/>;
};

export default (PayCloud);
