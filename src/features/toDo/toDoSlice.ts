import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ToDoItem {
  text: string;
  isDone: boolean
}

export interface Filter {
  done: boolean;
  actual: boolean;
}

export interface ListState {
  list: ToDoItem[];
  filter: Filter;
}

const initialState: ListState = {
  list: [],
  filter: {
    done: false,
    actual: false,
  }
};

export const toDoSlice = createSlice({
  name: 'toDoList',
  initialState,
  reducers: {
    add(store, action: PayloadAction<any>) {
      store.list.push({text: action.payload, isDone: false})
    },
    remove(store, action: PayloadAction<number>) {
      store.list.splice(action.payload, 1)
    },
    done(store, action: PayloadAction<any>) {
      store.list[action.payload.index].isDone = action.payload.value
    },
    filterActual(store, action: PayloadAction<boolean>) {
      store.filter.actual = action.payload
    },
    filterDone(store, action: PayloadAction<boolean>) {
      store.filter.done = action.payload
    }
  },
});

export const { add, remove, done, filterActual, filterDone } = toDoSlice.actions;

export const selectList = (state: RootState) => state.toDoList.list;
export const selectFilter = (state: RootState) => state.toDoList.filter;

export default toDoSlice.reducer;
