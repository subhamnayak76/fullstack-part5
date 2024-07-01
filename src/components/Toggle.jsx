// import React from 'react';
// import { useState } from 'react';
// const Toggle = ( props) => {
//     const [visible, setVisible] = useState(false)
//     const hideWhenVisible = { display: visible ? 'none' : '' }
//     const showWhenVisible = { display: visible ? '' : 'none' }
//     const toggleVisibility = () => {
//         setVisible(!visible)
//     }
//     return (
//         <div>
//             <div style={hideWhenVisible}>
//                 <button onClick={toggleVisibility}>{visible ? 'hide': 'view'}</button>
//             </div>
//             <div style={showWhenVisible}>
//                 {visible && props.children}
//                 <button onClick={toggleVisibility}>cancel</button>
//             </div>
//         </div>
//     )
// }

// export default Toggle;
import React, { useState } from 'react';

const Toggle = ({ label, children }) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div>
                {label}
                <button onClick={toggleVisibility}>
                    {visible ? 'hide' : 'view'}
                </button>
            </div>
            {visible && children}
        </div>
    )
}

export default Toggle;