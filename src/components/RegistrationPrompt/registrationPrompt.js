import {connect} from "react-redux";
import React, {useState} from "react";
import "./registrationPrompt-style.scss"
import RegistrationModal from "../RegistrationModal/registrationModal";
import getMobile from "../../getMobile";

const RegistrationPrompt = (props) => {
    const [showRegModal, setShowRegModal] = useState(false);

    const closeReg = () => {
        props.closeReg();
        window.sessionStorage.promptOpenHeader = "false";
        setShowRegModal(false);
    };

    return (
        <div className="registration-prompt__container">
            {!showRegModal && (
                <div
                    className={props.movie ? "registration-prompt__movie__mobile" : getMobile() !== "unknown" ? "registration-prompt__mobile" : "registration-prompt"}>
                    <p className="registration-prompt__bold" onClick={() => {
                        setShowRegModal(true);
                        window.sessionStorage.promptOpen = "false";
                    }}>
                        Зарегистрируйтесь,
                    </p>
                    <p className="registration-prompt__normal">чтобы не потерять доступ к подписке</p>
                    <button className="registration-prompt__button" onClick={() => {
                        setShowRegModal(true);
                    }}>
                        ОК
                    </button>
                </div>
            )}
            {showRegModal && (
                <RegistrationModal
                    prompt={true}
                    closeReg={closeReg}
                />
            )}
        </div>
    );
};

export default connect()(RegistrationPrompt);
