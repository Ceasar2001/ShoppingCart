import { allProducts } from '../assets/data'
import { createContext, useContext, useState } from 'react'
import { getItemFromStorage, getParsedItemFromStorage, setItemsInStorage } from '../utilities/localStorageFns'

const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [allItems, setAllItems] = useState([]);

    const setItems = () => {
        setAllItems(allProducts);
    }

    const addToCart = (item) => {
        setAllItems((prevItems) => {
            return prevItems.map((prevItem) => {
                if(prevItem.inCart){
                    return prevItem
                }
                return prevItem.id === item.id ? {...prevItem, inCart: true} : prevItem
            })
        })
    }
    
    const removeFromCart = (item) => {
        setAllItems((prevItems) => {
            return prevItems.map((prevItem) => {
                return prevItem.id === item.id ? {...prevItem, inCart: false, quantity: 1} : prevItem
            })
        })
    }

    const updateQuantity = (cartItem, amount) => {
        setAllItems((prevItems) => {
            return prevItems.map((item) => {
                return item.id === cartItem.id ? {...item, quantity: item.quantity + amount} : item
            })
        })
    }

    // this condition insures the function only proceeds if there is an item in the local storage under the card items key
    const setCartItemsFromStorage = () => {
        if(getItemFromStorage('cartItems') !== null){
            const storageItems = getParsedItemFromStorage('cartItems')

            setAllItems((prevItems) => {
                return(
                    prevItems.map((item) => {
                        const matchedItem = storageItems.find((storageItems) => storageItems.id === item.id)
                        return matchedItem ? matchedItem : item
                    })
                )
            })
        }
    }

    const setLocalStorage = () => {
        if(allItems.length !== 0){
            const inCartItems = allItems.filter((item) => item.inCart)
            setItemsInStorage('cartItems', inCartItems)
        }
    }

    return (
        <CartContext.Provider value={{allItems, setItems, addToCart, removeFromCart, updateQuantity, setLocalStorage, setCartItemsFromStorage}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}