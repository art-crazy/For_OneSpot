import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import App from './App.js';
import store from './store/store.js';
import './style.css';

const root = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    root
);

// React 18+
// import {createRoot} from 'react-dom/client';
//
// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
//
// root.render(
//     <Provider store={store}>
//         <App/>
//     </Provider>);
