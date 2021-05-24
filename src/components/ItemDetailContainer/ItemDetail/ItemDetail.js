import React, {useContext, useState, useEffect} from 'react';
import './ItemDetail.css';
import {CarritoContext} from './../../../context/CarritoContext';
import {UserContext} from './../../../context/UserContext'
import ItemCounter from '../../ItemCounter/ItemCounter';
import {Link} from 'react-router-dom'

export default function ItemDetail({libro}) {

    const {user} = useContext(UserContext)
    const {addItem} = useContext(CarritoContext);
    const [itemCountVisibility, setItemCountVisibility] = useState(true);
    return(
        <div className='ItemDetail'>
            <img id='itemDetailImg' src={libro.imagen} />
            <div className='detalles'>
                <p className='titulo'>{libro.titulo}</p>
                <p className='autor'>Autor: {libro.autor}</p>
                <p className='descripcion'>{libro.descripcion}</p>
                <form id='ItemDetailForm'>
                {itemCountVisibility ? 
                    <ItemCounter />
                    : 
                    <Link style={{textDecoration: 'none'}} to={`${user.name ? '/cart' : '/login'}`}><button id='FinalizarCompraButton'>Finalizar compra</button><br /></Link>
                    }
                    <select name='formatoLibro' id='formatoLibro'>
                        <option value='tapaDura'>Tapa dura ${libro.formatos.tapaDura.precio}</option>
                        <option value='tapaBlanda'>Tapa blanda ${libro.formatos.tapaBlanda.precio}</option>
                        <option value='ebook'>Ebook ${libro.formatos.ebook.precio}</option>
                    </select>
                    <input type='submit' onClick={(e)=>addItem(e,libro,setItemCountVisibility)} value='Agregar al Carrito'  />
                </form>
            </div>
        </div>
    )
}