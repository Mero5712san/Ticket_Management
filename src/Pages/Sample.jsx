import React, { useState } from 'react';
import CenterBox from '../Components/SideBox/CenterBox';

const Sample = () => {
    const [sidecondition, setsidecondition] = useState(false)

  return (
    <div>
        <li onClick={()=>{setsidecondition(true)}}>X</li>
        <CenterBox opencondition={sidecondition} setopencondition={setsidecondition}/>
    </div>
  );
}

export default Sample;
