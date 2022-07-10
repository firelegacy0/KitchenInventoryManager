import React from "react";
import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';


const LOCAL_STORAGE_FOODS_KEY = 'foods'

function SearchFood() {

    const [query, setQuery] = useState('')
    const [list, setList] = useState([])

    //First render to load from localstorage
    useEffect(() => {

        //Retrieve an entry from localstorage
        const entry = localStorage.getItem(LOCAL_STORAGE_FOODS_KEY)

        //Parse it 
        var foodArray = JSON.parse(entry)

        if (foodArray) {
            setList(foodArray)
        }

    }, [])


    return (

        <div>
            <h2> Search Food </h2>
            <div className="SearchMenu">
                <form>
                    <label for="searchFood"> Search Food: </label> <input type="text" onChange={(event) => setQuery(event.target.value)} placeholder="Enter food or barcode"></input> <br></br>
                    <div className="results">

                        <ul id="queryResults">

                            <div className="resultsText">
                                {/* //short circuit to hide data if there's nothing in query input box*/}
                                {/* prints number of results found, using list.filter length */}
                                {query.length > 0 && list
                                    .filter(item => item.foodName.toLowerCase().includes(query.toLowerCase())
                                        || item.barcodeNumber === query).length + " results found."}
                            </div>

                            {/* //short circuit to hide data if there's nothing in query input box*/}
                            {/* prints the item name returned from search query */}
                            <div className="resultsItemName">

                                {query.length > 0 && list
                                    .filter(item => item.foodName.toLowerCase().includes(query.toLowerCase())
                                        || item.barcodeNumber === query)
                                    .map((item, key) => (
                                        <li key={key}>
                                            Food name: {item.foodName}{'  '}

                                            <button type="button">
                                                <Link
                                                    to='/quantity'
                                                    state={item}>
                                                    Manage </Link></button>
                                        </li>
                                    ))}

                            </div>
                        </ul>

                    </div>

                </form>
            </div >
        </div>

    )
}

export default SearchFood
