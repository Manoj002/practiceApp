import {configureStore} from '@reduxjs/toolkit';
import dashboard_reducers from '../reducers/dashboard_reducers';

const store = configureStore({reducer: {dashboard_reducers}});

export default store;
