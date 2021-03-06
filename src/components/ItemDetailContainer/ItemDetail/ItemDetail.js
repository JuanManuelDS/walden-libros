import React, {useContext, useState, useEffect} from 'react';
import './ItemDetail.css';
import {CarritoContext} from './../../../context/CarritoContext';
import {UserContext} from './../../../context/UserContext'
import ItemCounter from '../../ItemCounter/ItemCounter';
import {Link} from 'react-router-dom'

export default function ItemDetail({libro}) {

    const {user} = useContext(UserContext)
    const {addItem, checkStock, stock} = useContext(CarritoContext);
    const [itemCountVisibility, setItemCountVisibility] = useState(true);

    useEffect(()=>{
        checkStock(libro);
    },[])

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
                    <select name='formatoLibro' onChange={e=>checkStock(libro,e)}  id='formatoLibro'>
                        <option value='tapaDura'>Tapa dura ${libro.formatos.tapaDura.precio}</option>
                        <option value='tapaBlanda'>Tapa blanda ${libro.formatos.tapaBlanda.precio}</option>
                        <option value='ebook'>Ebook ${libro.formatos.ebook.precio}</option>
                    </select>
                    {stock && itemCountVisibility ? 
                        <input type='submit' onClick={(e)=>addItem(e,libro,setItemCountVisibility)} value='Agregar al Carrito'  />
                        :
                        //En caso de haberse escondido el contador le saco la funcionalidad al botón para evitar errores
                        <input type='submit' className='notActive' onClick={e=>e.preventDefault()} value='Agregar al Carrito'  />
                    }
                    <p id='stock-info' className={!stock ? 'stock-alert': ''}>Cantidad en stock: {stock}</p>
                </form>
            </div>
        </div>
    )
}