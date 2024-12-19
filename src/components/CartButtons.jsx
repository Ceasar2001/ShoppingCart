import { useCart } from '../context/cartContext'

const CartButtons = ({item, fromCart}) => {
  const {addToCart, removeFromCart, updateQuantity} = useCart()

  return (
    <div className={`w-max absolute right-5 top-5 ${fromCart && 'scale-90'}`}>
        <div className='space-x-3'>
          {!item.inCart ? (
            <button
            type='button'
            className='bg-gray-700 border rounded-md px-2 py-1 text-sm text-white hover:bg-gray-600 transition-colors' 
            onClick={() => addToCart(item)}>
            + Add to cart
        </button>
          ): (
            <div>
              <div className='flex'>
                {/* subtract or remove items in the cart */}
                <button
                  className='border rounded-lg px-3 bg-red-700 text-white hover:bg-gray-600'
                  type='button'
                  onClick={() => {
                    if(item.quantity === 1){
                      removeFromCart(item)
                    }else{
                      updateQuantity(item, -1)
                    }
                  }}>-</button>
                <p className='flex items-center gap-x-1 mx-1'>
                  <span className='min-w-7 bg-gray-800 text-white grid place-items-center border rounded-full'>{item.quantity}</span>
                  <span className='text-xs'>in cart</span>
                </p>
                {/* add more quantity to your card */}
                <button
                  className='border rounded-lg px-3 bg-green-700 text-white hover:bg-gray-600'
                  onClick={() => {
                    updateQuantity(item, 1)
                  }}
                  >+</button>
              </div>
              <button className='bg-red-500 mx-auto mt-2 block rounded-md px-2 py-1 text-xs text-white hover:bg-red-600'
              onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          )}
        </div>
    </div>
  )
}

export default CartButtons
