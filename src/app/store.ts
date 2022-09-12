import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoReducer from '../features/toDo/toDoSlice';

export const store = configureStore({
  reducer: {
    toDoList: todoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
