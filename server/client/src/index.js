import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import 'jquery/src/jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap.js';
import './styles/app.css';
import reducers from './reducers';
import App from './components/App';
const store = createStore(reducers,{},applyMiddleware(reduxThunk));

const AppRoot = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(AppRoot, document.getElementById('root'));
registerServiceWorker();
