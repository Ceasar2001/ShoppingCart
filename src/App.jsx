import { useEffect } from 'react'
import CartItem from './components/CartItem'
import {useCart} from './context/cartContext'
import ShoppingCart from './components/ShoppingCart'
import { getItemFromStorage, getParsedItemFromStorage } from './utilities/localStorageFns'

const App = () => {
  const {allItems, setItems, setCartItemsFromStorage} = useCart()

  useEffect(() => {
    setItems()

    if(getParsedItemFromStorage('cartItems')?.Length !== 0 && getItemFromStorage('cartItems') !== null){
      setCartItemsFromStorage()
    }
  }, [])

  useEffect(() => {
    console.log(allItems)
  }, [allItems])
  
  return (
    <div className='grid place-items-center py-20 bg-gray-900 text-white'>
      <h1 className='lg:text-5xl md:text-4xl text-3xl italic text-gray-500 mb-16 px-10 text-center'>
        Trend Alert: Must-Have Outfits of the Season
      </h1>
      <ShoppingCart />
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 place-items-start gap-10 xl:px-6 px-10">
        {allItems?.map((item) => {
          return(
            <CartItem key={item.id} item={item} />
          )
        })}
      </div>
    </div>
  )
}

export default App