import React, {useState, useEffect} from 'react';

export const CarritoContext = React.createContext([]);

export const CarritoFunctions = ({children}) => {

    const [cart, setCart] = useState([]);
    const [costoEnvio, setCostoEnvio] = useState(459);
    const [total, setTotal] = useState(0);

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
            //ERROR: necesito saber el precio del item y después multiplicarlo por la cantidad
            newCart[isInCartIndex].price = precio * newCart[isInCartIndex].quantity;
            setTotal(total+precio*itemQuantity)
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
            setTotal(total+newItem.price)
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
        <CarritoContext.Provider value={{addItem, deleteItem, cleanCart,total, cart, costoEnvio}}>
            {children}
        </CarritoContext.Provider>
    )

}