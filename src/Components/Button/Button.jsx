import React from 'react';
import '../../Styles/Button.css'
import { useDispatch, useSelector } from 'react-redux';
import { Increment,Decrement } from '../../slice/Buttonslice';
const Button = () => {
    const  dispatch = useDispatch();

    return (
        <div>
            <div className="lowercontent">
                <button className="back" onClick={()=>{dispatch(Decrement())}}>
                    Go Back
                </button>
                <button className="next" onClick={()=>{dispatch(Increment())}}>
                    continue
                </button>
            </div>
        </div>
    );
}

export default Button;
