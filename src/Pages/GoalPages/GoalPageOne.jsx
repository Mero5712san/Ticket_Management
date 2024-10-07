import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../Components/Button/Button';
import '../../Styles/GoalPageOne.css'
const GoalpageOne = () => {

    const [domain, setdomains] = useState([])
    const [elementactive , setelementactive] = useState("")
    const fetchDomains = async () => {
        try {
            const response = await axios.get('http://localhost:8081/master/domains');
            //   console.log(response.status);
            if (response.status === 200)
                // dispatch(addMasterVehiclesData(response.data))
                setdomains(response.data)
        } 
        catch (error) {
            console.log("error while fetching data", error);
        }
    };

    useEffect(() => {
        fetchDomains();
    }, []);
    console.log(domain)
    return (
        <div className="pageone">
            <div className="uppercontent">
                <div className="heading">
                    <li>What roadmap do you wish to create?</li>
                </div>
                <div className="default">
                    <li>Default</li>
                </div>
                <div className="options">
                    {domain.map((item, index) => (
                        <div className={elementactive === item.name ? "elementactive" : "elements"} key={index} onClick={()=>{setelementactive(item.name)}}>
                            <li><input type="radio" name="element" id="" checked = {elementactive === item.name}/></li>
                            <li>{item.name}</li>
                        </div>
                    ))}
                </div>
            </div>
            <div className="button">
                < Button />
            </div>
        </div>
    );
}

export default GoalpageOne;
