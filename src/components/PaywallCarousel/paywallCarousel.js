import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {getEkPackages, getPaywalls} from "../../api";
import getMobile from "../../getMobile";
import {Link} from "react-router-dom";

import left from "../../img/left.svg";
import right from "../../img/right.svg";

import "./paywallCarousel-style.scss"
import {getUrlParams} from "../../utils";
import PayCloud from "../PayCloud/payCloud.tsx";


const PaywallCarousel = (props) => {

    const [pay, setPay] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isBought, setIsBought] = useState(true);
    const [isSearch, setIsSearch] = useState("searchContinues");

    useEffect(() => {
        props.fetchPaywalls();
        props.fetchGetEkPackages();
    }, []);

    function closePay() {
        let eventParams = {
            userid: localStorage.getItem("profile_id"),
            package_name: props.paywalls.ek_packages[currentIndex].title,
            cost: props.paywalls.ek_packages[currentIndex].cost,
        };
        _tmr.push({
            id: '',
            type: 'reachGoal',
            userid: localStorage.getItem("profile_id"),
            goal: 'MOVIE_PAYWALL_SPINNER_BUY_CANCEL',
            params: eventParams
        });
        setPay(false);
    }

    function closePayMobile(index) {
        let eventParams = {
            userid: localStorage.getItem("profile_id"),
            package_name: props.paywalls.ek_packages[index].title,
            cost: props.paywalls.ek_packages[index].cost,
        };
        _tmr.push({
            id: '',
            type: 'reachGoal',
            userid: localStorage.getItem("profile_id"),
            goal: 'MOVIE_PAYWALL_SPINNER_BUY_CANCEL',
            params: eventParams
        });
        setCurrentIndex(index);
        setPay(false);
    }

    function clickPaywall() {
        let eventParams = {
            userid: localStorage.getItem("profile_id"),
            package_name: props.paywalls.ek_packages[currentIndex].title,
            cost: props.paywalls.ek_packages[currentIndex].cost,
        };
        _tmr.push({
            id: '',
            type: 'reachGoal',
            userid: localStorage.getItem("profile_id"),
            goal: 'MOVIE_PAYWALL_SPINNER_BUY',
            params: eventParams
        });
        setPay(true);
    }

    function clickPaywallMobile(index) {
        let eventParams = {
            userid: localStorage.getItem("profile_id"),
            package_name: props.paywalls.ek_packages[index].title,
            cost: props.paywalls.ek_packages[index].cost,
        };
        _tmr.push({
            id: '',
            type: 'reachGoal',
            userid: localStorage.getItem("profile_id"),
            goal: 'MOVIE_PAYWALL_SPINNER_BUY',
            params: eventParams
        });
        setCurrentIndex(index);
        setPay(true);
    }

    if (props.paywalls.length !== 0 && !!props.ekPackages && isSearch === "searchContinues") {
        let eventParams = {
            userid: localStorage.getItem("profile_id"),
            package_name: props.paywalls.ek_packages[0].title,
            cost: props.paywalls.ek_packages[0].cost,
        }
        _tmr.push({
            id: '',
            type: 'reachGoal',
            userid: localStorage.getItem("profile_id"),
            goal: 'MOVIE_PAYWALL_SPINNER_SHOW',
            params: eventParams
        });

        function checkStatus(obj) {
            for (let key in obj) {
                if (obj[key].status === "cancelled" || obj[key].status === "confirmed" || obj[key].status === "suspended") {
                    return true;
                }
            }
            return false;
        }

        setIsBought(checkStatus(props.ekPackages));
        setIsSearch("searchSuccess")

        props.handleVisible();
    }

    const handleClickPrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(props.paywalls.ek_packages.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleClickNext = () => {
        if (currentIndex === props.paywalls.ek_packages.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    if (props.paywalls.length === 0) {
        return (
            <div></div>
        );
    }

    if (isBought) {
        return (
            <div/>
        );
    }

    // PC
    if (getMobile() === "unknown") {
        return (
            <div className="paywall-carousel__container">
                {pay &&
                    <PayCloud
                        closePay={closePay}
                        package_id={props.paywalls.ek_packages[currentIndex].goods.package_id}
                        texts={props.paywalls.ek_packages[currentIndex].goods.tariffs[0].texts}
                        package_name={props.paywalls.ek_packages[currentIndex].package_name}
                        cost={props.paywalls.ek_packages[currentIndex].cost}
                        namePage="MOVIE_PAYWALL_SPINNER"
                    />
                }
                {/*Пейволл карусель*/}
                <div className="paywall-carousel">
                    <button className="carousel__button carousel__button__left" onClick={handleClickPrev}>
                        <img className="collection__slide__left__arrow" src={left} alt="left"/>️
                    </button>
                    {/**/}
                    <Link to={{
                        pathname: "/account/packages/" + props.paywalls.ek_packages[(currentIndex - 2 + props.paywalls.ek_packages.length) % props.paywalls.ek_packages.length].goods.package_id + "/",
                        search: "?" + getUrlParams()
                    }}>
                        <img className="carousel__image"
                             src={props.paywalls.ek_packages[(currentIndex - 2 + props.paywalls.ek_packages.length) % props.paywalls.ek_packages.length].poster_url}
                             alt="carousel-image"/>
                    </Link>
                    {/**/}
                    <Link to={{
                        pathname: "/account/packages/" + props.paywalls.ek_packages[(currentIndex - 1 + props.paywalls.ek_packages.length) % props.paywalls.ek_packages.length].goods.package_id + "/",
                        search: "?" + getUrlParams()
                    }}>
                        <img className="carousel__image"
                             src={props.paywalls.ek_packages[(currentIndex - 1 + props.paywalls.ek_packages.length) % props.paywalls.ek_packages.length].poster_url}
                             alt="carousel-image"/>
                    </Link>
                    {/*Центральный элемент*/}
                    <div className="carousel__image__block" onClick={clickPaywall}>
                        <img className="carousel__image carousel__image__lengthen"
                             src={props.paywalls.ek_packages[currentIndex].poster_url} alt="carousel-image"/>
                        <div className="carousel__packages-info__container__pc__buy">
                            <p>{props.paywalls.ek_packages[currentIndex].goods.tariffs[0].pay_text}</p>
                        </div>
                    </div>
                    {/**/}
                    <Link to={{
                        pathname: "/account/packages/" + props.paywalls.ek_packages[(currentIndex + 1) % props.paywalls.ek_packages.length].goods.package_id + "/",
                        search: "?" + getUrlParams()
                    }}>
                        <img className="carousel__image"
                             src={props.paywalls.ek_packages[(currentIndex + 1) % props.paywalls.ek_packages.length].poster_url}
                             alt="carousel-image"/>
                    </Link>
                    {/**/}
                    <Link to={{
                        pathname: "/account/packages/" + props.paywalls.ek_packages[(currentIndex + 2) % props.paywalls.ek_packages.length].goods.package_id + "/",
                        search: "?" + getUrlParams()
                    }}>
                        <img className="carousel__image"
                             src={props.paywalls.ek_packages[(currentIndex + 2) % props.paywalls.ek_packages.length].poster_url}
                             alt="carousel-image"/>
                    </Link>
                    {/**/}
                    <button className="carousel__button carousel__button__right" onClick={handleClickNext}>
                        <img className="collection__slide__right__arrow" src={right} alt="right"/>️
                    </button>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => ({
    paywalls: state.paywalls,
    ekPackages: state.ekPackages,
});

const mapDispatchToProps = {
    fetchPaywalls: getPaywalls,
    fetchGetEkPackages: getEkPackages,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PaywallCarousel);
