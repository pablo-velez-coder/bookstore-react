import { useState } from 'react';
import './App.css';
import BookStore from './components/BookStore';

function App() {
  const [cart, setCart] = useState([])
  const [openList, setOpenList] = useState(false)

  const addToCart = book =>{
    if (cart.find(item=> item.title===book.title)){
      setCart(cart.map(x=>{
        if(x.title===book.title){
          return ({
            ...x,
            quantity: x.quantity +1
          })
        }
        else return x
      }))
    }else{
      setCart(prevCart=>[...prevCart, book])
    }
    
  }

  const toggleCart = ()=>{
    setOpenList(!openList)
  }

  const removeFromCart = id =>{
    const foundBook = cart.find(item=> item.id===id)
    if ( foundBook && foundBook.quantity>1){
      setCart(cart.map(x=>{
        if(x.id===id){
          return ({
            ...x,
            quantity: x.quantity -1
          })
        }
        else return x
      }))
    }else{
      setCart(cart.filter(book=> book.id !== id))
    }
    
  }

  return (
    <div className="App">
      <button
      onClick={toggleCart}
      >
       {openList ? 'Go back to Bookstore':  'Cart'}
      </button>
     {openList? <>
     <div>
      {cart.map(book=>(
        <div className='cartbook' key={book.id}>
          <p>{book.title}</p>
          <p>{book.quantity}</p>
          <button
          onClick={()=>removeFromCart(book.id)}
          >
            Remove
          </button>
        </div>
      ))}

     </div></>: <BookStore
     cart={cart}
      addToCart={addToCart}
      />}
    </div>
  );
}

export default App;
