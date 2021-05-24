import React, {useState, useContext, useEffect} from 'react';
import './ItemCounter.css';
import {CarritoContext} from '../../context/CarritoContext'

export default function ItemCounter (){
    
    const {stock} = useContext(CarritoContext);

    const [count, setCount] = useState(1)

    useEffect(()=>{
        count>stock && setCount(stock)
    }, [stock])

    const onAdd = e =>{
        e.preventDefault();
        if(stock>count){
            setCount(count+1);
        }
    }

    const onSubstract = e =>{
        e.preventDefault();
        if(count>0) setCount(count-1)
    }
    
    return(
        <div className='ItemCounter'>
            Ingrese cantidad a comprar: <button onClick={e=>onAdd(e)} className='ItemCounterButton'>+</button><span id='ItemCountSpan'>{count}</span><button onClick={e=>onSubstract(e)} className='ItemCounterButton'>-</button>
        </div>
    )
}
