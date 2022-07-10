import React from "react";
import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const LOCAL_STORAGE_FOODS_KEY = 'foods'

const LOCAL_STORAGE_ZONES_KEY = 'zones'

const LOCAL_STORAGE_QTY_KEY = 'quantity'

function QuantityManagement() {

    //useLocation states to accept parameters passed from previous component
    //from searchFood.jsx in this case linked
    const location = useLocation();

    const foodName = location.state?.foodName

    const foodUnits = location.state?.units

    const restockQty = location.state?.restockQty

    //variables used for Quantity Managing
    //foodZoneName
    const [foodZone, setFoodZone] = useState('')

    //foodQuantity for that zone
    const [foodQuantity, setFoodQuantity] = useState('')

    //list to hold the above 2 entries
    const [zoneList, setZoneList] = useState([])

    const [quantityList, setQuantityList] = useState([])

    //First render to load from localstorage
    useEffect(() => {

        //Retrieve foodArray from localStorage
        const foodArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FOODS_KEY))

        const zoneArray = localStorage.getItem(LOCAL_STORAGE_ZONES_KEY)

        const quantityArray = localStorage.getItem(LOCAL_STORAGE_QTY_KEY)


        //if not empty, read it
        if (zoneArray) {
            setZoneList(JSON.parse(zoneArray))
        }
        if (quantityArray) {
            setQuantityList(JSON.parse(quantityArray))
        }

    }, [])


    //Render to update quantityList in localstorage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_QTY_KEY, JSON.stringify(quantityList))
    }, [quantityList])


    //handler to add new items into quantityList state
    const handleSubmit = event => {

        //if empty zone or empty quantity
        if (foodZone.length === 0 || foodQuantity.length === 0) {
            event.preventDefault()
            alert("Zone or Quantity cannot be empty")
            return
        }

        const quantityArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_QTY_KEY))

        //Make a new entry to store into quantityList
        const newQuantity = {
            foodName: foodName,
            foodZone: foodZone,
            foodQuantity: foodQuantity,
            restockQty: restockQty
        }

        setQuantityList(quantityArray.concat(newQuantity))

        alert("Zone added")

        event.preventDefault()

    }

    return (

        <div>
            <h2> Quantity Management </h2>
            <div className="quantityMenu">
                <div className="quantityFoodTitle">
                    {foodName} ({foodUnits})
                </div>

                <div className="existingZones">
                    <div className="existingZoneTitle"> Existing Zones: </div>

                    {/* filter the quantityList for zones that belong to each food entry after adding */}
                    {quantityList.length > 0 && quantityList
                        .filter(item => item.foodName.toLowerCase().includes(foodName.toLowerCase()))
                        .map((item, key) => (
                            <li key={key}>
                                <label for="foodZone"> {item.foodZone} </label> <input type="number" min="1" max="100" defaultValue={item.foodQuantity} />
                            </li>
                        ))}
                </div>

                {/* form area to handle changes */}
                <form onSubmit={handleSubmit}>
                    <div className="addNewZone">
                        <div className="newZoneTitle"><label for="newZone"> New Zone: </label></div>
                        <select onChange={(event) => setFoodZone(event.target.value)}>
                            <option defaultValue="dropdownLabel"> Select a Zone </option>
                            {zoneList.map((zone, index) =>
                                <option value={zone.zoneName} > {zone.zoneName} </option>
                            )}
                        </select>
                        <input type="number" min="0" max="100" onChange={(event) => setFoodQuantity(event.target.value)} />

                    </div>
                    <input type="submit" value="Add" />
                </form>
            </div >


        </div >

    )
}

export default QuantityManagement
