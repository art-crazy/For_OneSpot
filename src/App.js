import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import {authByDeviceUid, setProfileUtm} from './api';
import {getDeviceUid,} from './utils';
import Home from './pages/home';
import Movie from './pages/Movie/movie.js';
import TabTvChannels from "./pages/Channel/TabTvChannels"
import Channel from "./pages/Channel/channel"
import imageSpinner from './img/loading.gif';
import PayRedirect from "./pages/pay-redirect";
import Account from "./pages/account.jsx";
import Packages from "./pages/packages.jsx";
import CardsMobile from "./components/lk/CardsMobile.jsx";
import Search from "./components/Search/search.jsx";
import PackageInfo from "./components/lk/PackageInfo.jsx";
import AboutUs from "./pages/aboutUs";
import PayCloudRedirect from "./pages/pay-cloud-redirect";
import AuthYandex from "./pages/authYandex.tsx";
import TvGuide from "./pages/Channel/tvGuide.tsx";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.state.loader !== "success") {
            return (
                <div className="loader_block">
                    <img className="loader_block__img" src={imageSpinner} alt=""/>
                </div>
            );
        }

        return (
            <Router
                basename="/promo/web/"
            >
                <Switch>
                    <Route path="/about_us" component={AboutUs}/>
                    <Route path="/account/cards" component={CardsMobile}/>
                    <Route path="/account/packages/:package_id/cloud_redirect" component={PayCloudRedirect}/>
                    <Route path="/account/packages/:package_id/redirect" component={PayRedirect}/>
                    <Route path="/account/packages/:package_id" component={PackageInfo}/>
                    <Route path="/account/packages" component={Packages}/>
                    <Route path="/account" component={Account}/>
                    <Route path="/tv/:tv_channel_id/cloud_redirect" component={PayCloudRedirect}/>
                    <Route path="/tv/:tv_channel_id/redirect" component={PayRedirect}/>
                    <Route path="/tv/:tv_channel_id/tv_guide" component={TvGuide}/>
                    <Route path="/tv/:tv_channel_id"
                           render={(props) => (<Route key={props.match.params.tv_channel_id} component={Channel}/>)}/>
                    <Route path="/tv" component={TabTvChannels}/>
                    <Route path="/movie/:EK_id/:EP_id/cloud_redirect" component={PayCloudRedirect}/>
                    <Route path="/movie/:EK_id/:EP_id/redirect" component={PayRedirect}/>
                    <Route path="/movie/:EK_id/cloud_redirect" component={PayCloudRedirect}/>
                    <Route path="/movie/:EK_id/redirect" component={PayRedirect}/>
                    <Route path="/movie/:EK_id/:EP_id"
                           render={(props) => (<Route key={props.match.params.EK_id} component={Movie}/>)}/>
                    <Route path="/movie/:EK_id"
                           render={(props) => (<Route key={props.match.params.EK_id} component={Movie}/>)}/>
                    <Route path="/auth_yandex" component={AuthYandex}/>
                    <Route path="/search" component={Search}/>
                    <Route path="/cloud_redirect" component={PayCloudRedirect}/>
                    <Route path="/redirect" component={PayRedirect}/>
                    <Route exact path="" component={Home}/>
                    <Redirect to=""/>
                </Switch>
            </Router>
        );
    }
}

export default (App);
