import React from 'react';
import Button from '../../Components/Button/Button';
import del from '../../assets/delete.svg'
import '../../Styles/GoalPageFour.css'
const GoalPagesFour = () => {
    return (
        <div className="pagefour">
            <div className="uppercontent">
                <div className="heading">
                    You can now break your project into phases
                </div>
                <div className="addphases">
                    <input type="text" placeholder='Type your phases here' />
                    <button>ADD</button>
                </div>
                <div className="phaselist">
                    <div className="phase">
                        <div className="name">
                            <li>P1</li>
                            <li><img src={del} alt="" /></li>
                        </div>
                        <div className="options">
                            <div>
                                <div className='number'>
                                    1
                                </div>
                                <div className='text'>
                                    invite Members
                                </div>
                            </div>
                            <div>
                                <div className='number'>
                                    2
                                </div>
                                <div className='text'>
                                    set time frame
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lowercontent">
                <Button />
            </div>
        </div>
    );
}

export default GoalPagesFour;
