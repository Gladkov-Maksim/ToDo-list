import React, {useCallback, useRef} from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { add, remove, done, filterDone, filterActual, selectList, selectFilter } from './toDoSlice';
import './toDo.scss';

export function ToDo() {

  const list = useAppSelector(selectList);
  const activeFilters = useAppSelector(selectFilter);
  const dispatch = useAppDispatch()
  const taskInp = useRef<HTMLInputElement>(null)
  const checkTaskInp = useCallback((cb:any) => {
      const node = taskInp.current
      if (node && node.value) cb(node)
  }, [])

  const clearInp = useCallback(() => checkTaskInp((node:any) => {
      console.log('clear')
      node.value = ''
  }), [])

  const addItem = useCallback(() => checkTaskInp((node:any) => {
      console.log('ADD')
      dispatch(add(node.value))
      clearInp()
  }), [])

  const handleDone = useCallback((e: React.SyntheticEvent<EventTarget>, index:number) => {
      const isDone = (e.target as HTMLInputElement).checked
      dispatch(done({index, value: isDone}))
  }, [])

  const filterActualToggle = useCallback((e: React.SyntheticEvent<EventTarget>) => {
      const value = (e.target as HTMLInputElement).checked
      dispatch(filterActual(value))
  }, [])

  const filterDoneToggle = useCallback((e: React.SyntheticEvent<EventTarget>) => {
      const value = (e.target as HTMLInputElement).checked
      dispatch(filterDone(value))
  }, [])

  const listItemRender = useCallback((item: any, index: number) => {
      return (
          <li key={item.text + index}>
              <div className='itemContainer'>
                  <div>
                      <label>
                          <input
                              type="checkbox"
                              defaultChecked={item.isDone}
                              onClick={(e) => handleDone(e, index)}
                          />
                          <div className="fakeCheckbox"></div>
                      </label>
                      <div className="task">{item.text}</div>
                  </div>
                  <button
                      onClick={() => dispatch(remove(index))}
                  >Х</button>
              </div>
          </li>
      )
  }, [])


  return (
      <>
          <div className="backgroundImg"></div>
          <div className="tinting"></div>
          <div className='wrapper'>
              <div className="head">
                  <div>
                      <label>
                          <input
                              type="checkbox"
                              onClick={(e) => filterDoneToggle(e)}
                          />
                          <div className="fakeCheckbox"></div>
                          <span>Выполненные</span>
                      </label>
                  </div>
                  <div>
                      <label>
                        <div></div>
                        <input
                            type="checkbox"
                            onClick={(e) => filterActualToggle(e)}
                        />
                        <div className="fakeCheckbox"></div>
                        <span>Актуальные</span>
                      </label>
                  </div>
                  <input
                      placeholder='Что нужно сделать?'
                      ref={taskInp}
                      onKeyDown={(e) => {
                          if (e.code === "Enter") addItem()
                      }}
                  />
                  <button
                      onClick={() => addItem()}
                  >Добавить</button>
                  <button
                      onClick={() => clearInp()}
                      >Сброс</button>
              </div>
              <ul>
                  {list.map((item:any, index: number) => {
                        if (activeFilters.done || activeFilters.actual) {
                            if (activeFilters.done === item.isDone) return listItemRender(item, index)
                            if (activeFilters.actual === !item.isDone) return listItemRender(item, index)
                        }
                        else return listItemRender(item, index)
                      }
                  )}
              </ul>
          </div>
      </>
  );
}
