import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(each => each.id !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each =>
        each.id === id ? {...each, quantity: each.quantity + 1} : each,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    if (cartList.map(each => each.quantity) > 0) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each =>
          each.id === id ? {...each, quantity: each.quantity - 1} : each,
        ),
      }))
    }
  }

  addCartItem = product => {
    this.setState(prev => {
      const existingProduct = prev.cartList.find(each => each.id === product.id)
      if (existingProduct) {
        return {
          cartList: prev.cartList.map(each =>
            each.id === product.id
              ? {...each, quantity: each.quantity + product.quantity}
              : each,
          ),
        }
      }
      return {cartList: [...prev.cartList, product]}
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
