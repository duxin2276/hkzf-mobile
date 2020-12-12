import React, { createContext } from 'react'

// 创建上下文。
export const StoreContext = createContext()

export const { Provider, Consumer } = StoreContext;
