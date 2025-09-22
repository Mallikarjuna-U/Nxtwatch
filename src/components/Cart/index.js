import Header from '../Header'
import CartListView from '../CartListView'
import EmptyCartView from '../EmptyCartView'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const getCartTotal = () =>
        cartList.reduce((total, each) => total + each.price * each.quantity, 0)

      return (
        <>
          <Header />
          <div className="cart-container">
            {cartList.length === 0 ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  onClick={removeAllCartItems}
                  className="remove-all-button"
                >
                  Remove All
                </button>
                <ul className="cart-list">
                  <CartListView />
                </ul>
                <div className="summery-container">
                  <div className="price-container">
                    <h1 className="order-total">
                      Order Total
                      <span className="price-total">Rs {getCartTotal()}/-</span>
                    </h1>
                  </div>
                  <p className="cart-count">{cartList.length} items in cart</p>
                  <button type="button" className="checkout-btn">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
