import React, { useEffect, useState } from 'react'

const LOCAL_STORAGE_ZONES_KEY = 'zones'

function ZoneManagement() {

    const [zoneName, setZoneName] = useState("")
    const [zoneColor, setZoneColor] = useState("Tomato")
    const [zoneList, setZoneList] = useState([])

    //First render to load from localstorage
    useEffect(() => {
        const item = localStorage.getItem(LOCAL_STORAGE_ZONES_KEY)

        //if not empty, read it
        if (item) {
            setZoneList(JSON.parse(item))
        }

    }, [])

    //Render to update zoneList in localStorage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_ZONES_KEY, JSON.stringify(zoneList))
    }, [zoneList])


    //handler to add new zones 
    const handleAddZone = event => {

        //if empty Zone Name, alert and return
        if (zoneName.length === 0) {
            event.preventDefault()
            alert("Zone Name cannot be empty")
            return
        }

        const zoneArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ZONES_KEY))

        //check if color already exists in the foodArray
        for (var x in zoneArray) {
            if (zoneArray[x].zoneColor === zoneColor) {
                event.preventDefault()
                alert("Zone Color already exists")
                return;
            }

        }

        //otherwise make new entries here, add to zoneList
        const newZone =
        {
            zoneName: zoneName,
            zoneColor: zoneColor
        }

        setZoneList(zoneList.concat(newZone))

    }

    //handler to remove zones from zoneList
    const handleRemoveZone = (index) => {
        const list = [...zoneList];
        list.splice(index, 1)
        setZoneList(list)
    }

    return (
        <div>
            <form>
                <div className="zoneForm">
                    <h2> Zone Management </h2>
                    <div className="zoneMenu">
                        Add Zone
                        <label for="ZoneName"> Name: </label><input type="text" onChange={(event) => setZoneName(event.target.value)}></input> <br></br>
                        <label for="ZoneColor"> Color: </label>
                        <select onChange={(event) => setZoneColor(event.target.value)}>
                            <option value="Tomato"> Red </option>
                            <option value="DodgerBlue"> Blue </option>
                            <option value="MediumSeaGreen"> Green </option>
                            <option value="Orange"> Orange </option>
                            <option value="SlateBlue"> Purple </option>

                        </select> <br></br>
                        <button type="button" onClick={handleAddZone}> Add </button>
                    </div>
                </div>
            </form >

            <div className='zoneCanvas'>
                {zoneList.map((zone, index) =>

                    <div key={index} className='zoneBox' style={{ backgroundColor: zone.zoneColor }}>
                        <div className="zoneBoxName">
                            {zone.zoneName}
                        </div>
                        <div className="zoneBoxTextArea">
                            Some Text
                        </div>
                        <br></br>
                        <button id="zoneRemove" type="button" onClick={() => handleRemoveZone(index)} > Remove </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ZoneManagement;
