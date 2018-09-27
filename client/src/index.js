// Require globals
import 'bootstrap/scss/bootstrap.scss'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';

import { store } from './redux/store/configureStore';

ReactDOM.render(
    <Provider store={store} ><App /></Provider>,
    document.getElementById('root')
);
registerServiceWorker();
