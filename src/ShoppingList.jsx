import React from "react";

import { useEffect, useState } from 'react';


const LOCAL_STORAGE_QTY_KEY = 'quantity'

function ShoppingList() {


    const [quantityList, setQuantityList] = useState([])

    //First render to load from localstorage
    useEffect(() => {

        //Retrieve an entry from localstorage
        const quantityArray = localStorage.getItem(LOCAL_STORAGE_QTY_KEY)



        if (quantityArray) {
            setQuantityList(JSON.parse(quantityArray))
        }

    }, [])


    return (

        <div>
            <h2> Shopping List </h2>

            <div className="shoppingList">
                {/* read quantityList entries */}
                {quantityList.map((item, index) =>
                    <div key={index}>
                        {/* only show food name if current quantity is less than specified restock amount */}
                        <div className="restockItems">
                            {item.foodQuantity < item.restockQty &&
                                "Food name: " + item.foodName + ",\n inStock: \n " + item.foodQuantity + ", \n Restock below: " + item.restockQty}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ShoppingList
