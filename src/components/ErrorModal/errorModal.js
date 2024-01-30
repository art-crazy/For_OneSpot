import React from "react";
import tv_btv_icon from "../../img/tv_btv_icon2.svg";
import "../Header/reg-style.css";
import {Link} from "react-router-dom";
import '../../style.css';
import {getUrlParams} from "../../utils";
import getMobile from "../../getMobile";

function ErrorModal(props) {
    return (
        <div className="error_modal">
            {getMobile() === "unknown" &&
                <div id="modalWin" className="reg-modal">
                    <div className="reg-modal-window">
                        <div className="reg-modal-window__container">
                            <div className="img-btv-modal__container"></div>
                            <img className="img-btv-modal" src={tv_btv_icon} alt=""/>
                        </div>
                        <p
                            className="reg-body"
                        >Что-то пошло не так :(</p>
                        <p
                            className="reg-body"
                        >Вернитесь на «Главную»</p>

                        <Link to={"/" + "?" + getUrlParams()}
                              className="link">
                            <div className="top__block__link">
                                Главная страница
                            </div>
                        </Link>

                    </div>
                    <div className="reg-overlay"></div>
                </div>
            }
        </div>
    );
}

export default ErrorModal;
