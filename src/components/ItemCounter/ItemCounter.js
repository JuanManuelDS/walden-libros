import React, {useState} from 'react';
import './ItemCounter.css';

export default function ItemCounter (){
  
    const [count, setCount] = useState(1)

    const onAdd = e =>{
        e.preventDefault();
        setCount(count+1);
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
