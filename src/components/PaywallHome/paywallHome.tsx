import React, {useEffect, useRef, useState} from "react";
import "./paywallHome-style.scss"
import {getEkPackagesPromise, getPaywallsPromise} from "../../api.ts";
import PayCloud from "../PayCloud/payCloud.tsx";

declare let _tmr: any;

const PaywallHome: React.FC = (props) => {

    const [items, setItems] = useState(null);
    const [pay, setPay] = useState(false);
    const [isKeyPaywall, setIsKeyPaywall] = useState(1);
    const myRef = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            // Используем async/await для получения данных
            const resEkPackages = await getEkPackagesPromise();
            const resPaywalls = await getPaywallsPromise();
            // Объединяем данные
            if (resEkPackages && resPaywalls) {
                const combinedItems = {
                    ekPackages: resEkPackages,
                    paywalls: resPaywalls,
                    purchased: checkStatus(resEkPackages.ek_packages),
                };

                // Сохраняем объединенные данные в состоянии
                setItems(combinedItems);
            }
        };
        fetchData();
    }, []);


    function checkStatus(obj) {
        for (let key in obj) {
            if (obj[key].status === "cancelled" || obj[key].status === "confirmed" || obj[key].status === "suspended") {
                return true;
            }
        }
        return false;
    }

    function closePay() {
        let eventParams = {
            userid: localStorage.getItem("profile_id"),
            package_name: items.paywalls.ek_packages[0].title,
            cost: items.paywalls.ek_packages[0].cost,
        }

        _tmr.push({
            id: "",
            type: 'reachGoal',
            userid: localStorage.getItem("profile_id"),
            goal: 'MOVIE_PAYWALL_BUY_CANCEL',
            params: eventParams
        });
        setPay(false);
    }

    function clickPaywall() {
        let eventParams = {
            userid: localStorage.getItem("profile_id"),
            package_name: items.paywalls.ek_packages[0].title,
            cost: items.paywalls.ek_packages[0].cost,
        }
        _tmr.push({
            id: '',
            type: 'reachGoal',
            userid: localStorage.getItem("profile_id"),
            goal: 'MOVIE_PAYWALL_BUY',
            params: eventParams
        });
        setPay(true);
    }

    function successPay() {
        setIsKeyPaywall(isKeyPaywall + 1)
    }

    if (items && !myRef.current) {
        let eventParams = {
            userid: localStorage.getItem("profile_id"),
            package_name: items.paywalls.ek_packages[0].title,
            cost: items.paywalls.ek_packages[0].cost,
        }
        _tmr.push({
            id: '',
            type: 'reachGoal',
            userid: localStorage.getItem("profile_id"),
            goal: 'MOVIE_PAYWALL_SHOW',
            params: eventParams
        });
    }

    if (!items) {
        return (
            <div/>
        );
    }

    const excludedPackages = [5199, 5300, 5400, 2020];

    if (!excludedPackages.includes(items.paywalls.ek_packages[0].package_id)) {
        return (
            <div/>
        );
    }

    if (items.purchased) {
        return (
            <div/>
        );
    }

    return (
        <div>
            {pay &&
                <PayCloud
                    successPay={successPay}
                    closePay={closePay}
                    package_id={items.paywalls.ek_packages[0].goods.package_id}
                    texts={items.paywalls.ek_packages[0].goods.tariffs[0].texts}
                    package_name={items.paywalls.ek_packages[0].package_name}
                    cost={items.paywalls.ek_packages[0].cost}
                    namePage="MOVIE_PAYWALL"
                />
            }
            <div className="paywall-home"
                 key={isKeyPaywall}
                 onClick={clickPaywall}>
                <img className="paywall-home__poster" src={items.paywalls.ek_packages[0].wide_poster_url}
                     alt="paywall"/>
            </div>
        </div>
    );
};

export default PaywallHome;
