import React,{useState,useEffect} from 'react'

const Book = () => {

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
                    setBooks({...book, 
                                data : data,
                                loader : false})
        })
        .catch(function(e) {
            console.log(e,"theres is an error")
        });

    },[book])

    console.log("book", book)

    return(
        <div>
            <div className="cards-list">
                {book.data !== null ? book.data.books.map((row,index) => <div key={index}>
                                                                            <div className="card">
                                                                                <div className="card_image">
                                                                                    <img src={row.image}  alt="errorimg"  />
                                                                                </div>
                                                                                <div className="card_title title-black">
                                                                                <p>{row.title}</p>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div className="container">
                                                                                <div className='front_card'>
                                                                                    <p>{row.price}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                         : <h1>Loading...</h1>}
                
            </div>

        </div>
    )
}
export default Book