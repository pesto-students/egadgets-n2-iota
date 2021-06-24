import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import ShopApp from './reducers';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const store = createStore(
  ShopApp,
  composeWithDevTools(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export default store;
