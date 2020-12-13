import React, { useState, useEffect, useCallback, useContext } from 'react';

import { StoreContext } from '../store'

const MyPage = props => {
    console.log('render');

    const [count, setCount] = useState(8)
    const [sum, setSum] = useState(100)

    useEffect(() => {
        document.querySelector('.myh2').classList.add('super-h' + count);
    }, [])

    const clkhdl = useCallback((e) => console.log(count), [count])


    const obj = useContext(StoreContext)

    console.log(obj);

    return (
        <div>
            <h2 className="myh2">{count}</h2>
            <h2>{sum}</h2>
            <button onClick={() => setCount(count + 1)}>+ 1</button>
            <button onClick={clkhdl}>+ 1</button>
        </div>
    )
}

export default MyPage
