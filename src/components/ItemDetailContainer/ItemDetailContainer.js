import React, {useState, useEffect} from 'react';
import Catalogo from '../../Catalogo'
import ItemDetail from './ItemDetail/ItemDetail'
import {useParams} from 'react-router-dom'
import './ItemDetailContainer.css'

export default function ItemDetailContainer(){
    const [libro, setLibro] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        const task = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(Catalogo())
            }, 500)
        })

        task. then(resolved => setLibro(resolved[id]))
    }, []);

    return (
        <div className='ItemDetailContainer'>
            {Object.keys(libro).length!==0 ? <ItemDetail libro={libro}/> : <img className='loadingGIF' src='https://res.cloudinary.com/dpl0ypk3m/image/upload/v1621455574/WaldenLibros/GIF/loading_l3xcfl.gif' />}
        </div>
    )

}