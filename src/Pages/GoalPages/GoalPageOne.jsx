import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../Components/Button/Button';
import '../../Styles/GoalPageOne.css'
import { useDispatch, useSelector } from 'react-redux';
import { Increment,Decrement } from '../../slice/Buttonslice';
import { setGoalDomainId } from '../../slice/CreateGoal';

const GoalpageOne = ({setOpen}) => {
    const  dispatch = useDispatch();
    const [domain, setdomains] = useState([])
    const [elementactive , setelementactive] = useState("")
    const [domainId,setDomainId] = useState(null)
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

    const handleIncrement = async () =>{
        dispatch(Increment())
        dispatch(setGoalDomainId(domainId))
    }

    const handleDecrement = async () => {
        dispatch(Decrement())
    }
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
                        <div className={elementactive === item.name ? "elementactive" : "elements"} key={index} onClick={()=>{setelementactive(item.name),setDomainId(item.id)}}>
                            <li><input type="radio" name="element" id="" checked = {elementactive === item.name}/></li>
                            <li>{item.name}</li>
                        </div>
                    ))}
                </div>
            </div>
            <div className="button">
                <Button next={handleIncrement} back={handleDecrement} />
            </div>
        </div>
    );
}

export default GoalpageOne;
