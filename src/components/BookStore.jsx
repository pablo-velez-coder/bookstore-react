import React,{useState,useEffect} from 'react'

const BookStore = ({addToCart, cart}) => {

    const initialState = {
        data : null,
        loader : true,
        error : false
    }

    const [book , setBooks ] = useState(initialState)

    useEffect(() => {

        if(!book.loader) return

        fetch("https://api.itbook.store/1.0/new")
        .then(response => {
            return response.json()
        })
        .then(data => {
        setBooks({
            ...book, 
            data,
            loader : false})
        })
        .catch(function(e) {
           /*  console.log(e,"theres is an error") */
            setBooks({
                ...book, 
                error : e.message})
            })

    },[])


    return(
        <div>
            <div className="cards-list">
            {book.data !== null ? book.data.books.map((book,index) => 
            <div key={book.id}>
                <div className="card">
                    <div className="card_image">
                        <img src={book.image}  alt="errorimg"  />
                    </div>
                    <div className="card_title title-black">
                    <p>{book.title}</p>
                    </div>
                </div>
                
                <div className="container">
                    <div className='front_card'>
                        <p>{book.price}</p>
                    </div>
                    <button
                    onClick={()=>addToCart({
                        id:Date.now(),
                        title:book.title,
                        quantity: 1
                    })}
                    >
                        Add to cart
                    </button>
                </div>
                </div> )
        : <h1>Loading...</h1>
        }          
            </div>
        </div>
    )
}
export default BookStore