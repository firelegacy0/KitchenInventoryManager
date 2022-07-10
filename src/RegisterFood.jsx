import React, { useEffect, useState } from 'react'


const LOCAL_STORAGE_FOODS_KEY = 'foods'


function RegisterFood() {
    const [foodList, setFoodList] = useState([])
    const [foodName, setFoodName] = useState('')
    const [barcodeNumber, setbarcodeNumber] = useState('')
    const [units, setUnits] = useState('grams')
    const [restockQty, setrestockQty] = useState('')


    //First render to load from localstorage
    useEffect(() => {
        const item = localStorage.getItem(LOCAL_STORAGE_FOODS_KEY)

        //if not empty, read it
        if (item) {
            setFoodList(JSON.parse(item))
        }

    }, [])

    //Render to update foodList in localstorage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_FOODS_KEY, JSON.stringify(foodList))

    }, [foodList])


    //Function to handle Register Food button submission
    const handleSubmit = event => {

        //Retrieve an entry from localstorage
        const entry = localStorage.getItem(LOCAL_STORAGE_FOODS_KEY)

        //Parse it 
        var foodArray = JSON.parse(entry)

        //If empty foodName or barcode is entered
        if (foodName.length === 0 || barcodeNumber.length === 0) {
            event.preventDefault()
            alert("Food Name or Barcode Number cannot be empty")
            return
        }

        //check if barcode already exists in the foodArray
        for (var x in foodArray) {
            if (foodArray[x].barcodeNumber === barcodeNumber) {
                event.preventDefault()
                alert("Barcode already exists")
                return;
            }

        }

        //Otherwise make a new entry
        //Make a new food object
        const newFood = {
            foodName: foodName,
            barcodeNumber: barcodeNumber,
            units: units,
            restockQty: restockQty,
        };

        //store the new food object into foodList
        setFoodList(foodList.concat(newFood))

        alert("Food added!")

        //reset the fields
        setFoodName('')
        setbarcodeNumber('')
        setUnits('')
        setrestockQty('')


    }


    return (

        <form onSubmit={handleSubmit}>
            <h2> Register Food </h2>
            <div className="registerForm">
                <label for="foodName"> Food Name: </label> <input type="text" onChange={(event) => setFoodName(event.target.value)} placeholder="e.g Banana"></input> <br></br>
                <label for="foodBarcode"> Barcode Number: </label> <input type="number" onChange={(event) => setbarcodeNumber(event.target.value)} placeholder="e.g 1,2,3.. or 101, 102.."></input> <br></br>
                <label for="foodUnits"> Units: </label> <select name="units" onChange={(event) => setUnits(event.target.value)}>
                    <option value="grams"> Grams </option>
                    <option value="kilograms"> Kilograms </option>
                    <option value="tbsp"> tbsp </option>
                    <option value="cup"> cup </option>
                </select> <br></br>
                <label for="foodRestock"> Restock below: (Optional) </label> <input type="number" name="restockQty" placeholder="e.g 2" min="1" max="10" onChange={(event) => setrestockQty(event.target.value)}></input> <br></br>

                <input type="submit" value="Register" />
            </div>
        </form >


    )



}

export default RegisterFood;
