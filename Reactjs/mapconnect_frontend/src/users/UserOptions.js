// import React, { useState } from 'react';
// import { IoMdClose } from 'react-icons/io';
// import './UserOptions.css';

// const UserOptions = ({ onClose }) => {
//   const [isIncognito, setIsIncognito] = useState(false);

//   const handleToggle = () => {
//     setIsIncognito(prevState => !prevState);
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <button className="close-button" onClick={onClose}>
//           <IoMdClose />
//         </button>
//         <h2>Options</h2>
        
//         <div className="toggle-container">
//           <span className="toggle-label">Incognito</span>
//           <label className="switch">
//             <input type="checkbox" checked={isIncognito} onChange={handleToggle} />
//             <span className="slider round"></span>
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserOptions;



import React from 'react';
import { IoMdClose } from 'react-icons/io';
import './UserOptions.css';

const UserOptions = ({ onClose, isIncognito, onToggleIncognito }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2>Options</h2>
        
        <div className="toggle-container">
          <span className="toggle-label">Incognito</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isIncognito} 
              onChange={onToggleIncognito} 
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserOptions;