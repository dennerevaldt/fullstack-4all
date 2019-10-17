import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: '@ekki',
      storage,
      whitelist: ['session', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
