 import React, {useState, useEffect} from 'react';
import { getFirestore} from '../firebase';
import {useHistory} from 'react-router-dom';
import firebase from 'firebase/app'

export const CarritoContext = React.createContext([]);

export const CarritoFunctions = ({children}) => {

    const [cart, setCart] = useState(
        localStorage.getItem('carrito')
          ? cargarStorage
          : []
      );
    const [costoEnvio, setCostoEnvio] = useState(459);
    const [total, setTotal] = useState(0);
    const [idPedido, setIdPedido] = useState();
    const [stock, setStock] = useState();
    const history = useHistory();

    function cargarStorage(){
        return JSON.parse(localStorage.getItem('carrito'));
    }

    function almacenarStorage(){
        localStorage.setItem('carrito', JSON.stringify(cart))
    }

    useEffect(()=>{
        almacenarStorage();
        setTotal(cart.reduce((tot, unit)=>tot+unit.price,0))
    }, [cart]);
  
    const addItem = (e,libro,setItemCountVisibility) => {
        e.preventDefault();
        const bookFormat = e.target.parentElement.querySelector('#formatoLibro').value,
        itemQuantity = Number(e.target.parentElement.querySelector('#ItemCountSpan').textContent),
        precio = searchPrice(libro, bookFormat), 
        itemId = searchId(libro, bookFormat), 
        isInCartIndex = isInCart(libro, bookFormat);

        setItemCountVisibility(false);

        //Si es -1 significa que ya está en el carrito
        if(isInCartIndex !== -1){
            let newCart = [...cart];
            newCart[isInCartIndex].quantity+=itemQuantity;
            newCart[isInCartIndex].price = precio * newCart[isInCartIndex].quantity;
            setCart([...newCart])
           
        } else {
            
            let newItem = {
                item: libro,
                format: bookFormat,
                price: precio * itemQuantity,
                pricePU: precio,
                quantity: itemQuantity,
                id: itemId
            }
            setCart([...cart, newItem]);
        }
    }

    const deleteItem = (e, libro)=>{
        
        const itemToDelete = cart.indexOf(libro);
        let newCart = [...cart];
        const amountToDelete = newCart[itemToDelete].price;
        newCart.splice(itemToDelete, 1);
        setTotal(total - amountToDelete);
        setCart([...newCart])
    }

    const cleanCart = ()=>{
        setCart([]);
        setTotal(0)
    };

    useEffect(()=>{
        total>4500 && setCostoEnvio(0)
        total<=4500 && setCostoEnvio(459)
    }, [total]);

    const isInCart = (libro, formato) => {
      
        let index = -1;
        let idLibro = searchId(libro, formato)

        cart.forEach((lib, ind) => {
            if(lib.id === idLibro){
                index = ind
            }
        })
        return index;
    }

    function createOrder(){
        const user = JSON.parse(localStorage.getItem('usuario'));
        let order = {
            buyer: user.uid,
            items: cart,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            total //es lo mismo que hacer total: total
        }
        const db = getFirestore();
        const orders = db.collection('orders');
        orders.add(order)
        .then(({id})=>{
            setIdPedido(id);
        })
        .then(()=>{
            updateStock(order);
            cleanCart();
            history.push('/order')
        })
        .catch(err=>console.error('Ha ocurrido un error al crear la orden', err))
    }

    function checkStock(libro,e=null){
        if(e === null){
            setStock(libro.formatos.tapaDura.stock);
        } else {
            let formato = e.target.value;
            switch(formato){
                case 'tapaDura':
                    setStock(libro.formatos.tapaDura.stock)
                    break;
                case 'tapaBlanda':
                    setStock(libro.formatos.tapaBlanda.stock)
                    break;
                case 'ebook':
                    setStock(libro.formatos.ebook.stock)
                    break;
            }
        }
    }

    function updateStock(order){
        const formato = order.items[0].format;
        const cantidad = order.items[0].quantity;
        let itemActualizado = {};
        const db = getFirestore();
        const item = db.collection('items').doc(order.items[0].item.id);
        item.get().then(qs=>{
            switch(formato){
                case 'tapaDura':
                    itemActualizado = {...qs.data().formatos,
                        tapaDura: {
                            stock: qs.data().formatos.tapaDura.stock - cantidad,
                            id: qs.data().formatos.tapaDura.id,
                            precio: qs.data().formatos.tapaDura.precio
                        }
                    }
                    return itemActualizado;
                case 'tapaBlanda':
                    itemActualizado = {...qs.data().formatos,
                        tapaBlanda:{
                            stock: qs.data().formatos.tapaBlanda.stock - cantidad,
                            id: qs.data().formatos.tapaBlanda.id,
                            precio: qs.data().formatos.tapaBlanda.precio
                        }
                    }
                    return itemActualizado;
                case 'ebook':
                    itemActualizado = {...qs.data().formatos,
                        ebook: {
                            stock: qs.data().formatos.ebook.stock,
                            id: qs.data().formatos.ebook.id,
                            precio: qs.data().formatos.ebook.precio
                        }
                    }
                    return itemActualizado;
            }
        }).catch(error => console.error('Error: ', error))
        .finally(()=>{
            item.update({formatos: itemActualizado});
        })
    }

    const searchPrice=(libro, formatoLibro)=>{
        let price = 0
        switch(formatoLibro){
            case 'tapaDura':
                price=libro.formatos.tapaDura.precio
                break;
            case 'tapaBlanda':
                price=libro.formatos.tapaBlanda.precio
                break;
            case 'ebook':
                price=libro.formatos.ebook.precio
                break;
        }
        return price;
    }

    const searchId=(libro, formato) => {
        let id = 0;
        switch(formato){
            case 'tapaDura':
                id=libro.formatos.tapaDura.id
                break;
            case 'tapaBlanda':
                id=libro.formatos.tapaBlanda.id
                break;
            case 'ebook':
                id=libro.formatos.ebook.id
                break;
        }
        return id;
    }
    

    return(
        <CarritoContext.Provider value={{addItem, checkStock, stock, deleteItem, cleanCart,total, cart, costoEnvio, createOrder, idPedido}}>
            {children}
        </CarritoContext.Provider>
    )

}