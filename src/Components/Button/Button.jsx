import React from 'react';
import '../../Styles/Button.css'

const Button = ({next,back}) => {

    return (
        <div>
            <div className="lowercontent">
                <button className="back" onClick={back}>
                    Go Back
                </button>
                <button className="next" onClick={next}>
                    continue
                </button>   
            </div>
        </div>
    );
}

export default Button;
