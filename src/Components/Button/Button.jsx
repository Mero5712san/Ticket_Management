import React from 'react';
import '../../Styles/Button.css'

const Button = ({next,back}) => {

    return (
            <div className="lowercontent">
                <button className="back" onClick={back}>
                    Go Back
                </button>
                <button className="next" onClick={next}>
                    continue
                </button>   
            </div>
    );
}

export default Button;
