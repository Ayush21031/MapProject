// import React from "react";
// import "./Search_person_card.css";


// const SearchPersonCard = () => {
//   return (
//     <div className="Person-card">
//       <div className="Person-card-info">
//         <div className="Person-card-name"></div>
//         <div className="Person-card-email"></div>
//       </div>
//       <div className= "Person-card-add-btn"></div>
//     </div>
//   );
// };

// export default SearchPersonCard;


// SearchPersonCard.js
import React from "react";
import "./SearchPersonCard.css";

const SearchPersonCard = ({ person }) => {
  return (
    <div className="person-card">
      <div className="person-card-info">
        <div className="person-card-name">{person.name}</div>
        <div className="person-card-email">{person.email}</div>
      </div>
      <button className="person-card-add-btn">Add</button>
    </div>
  );
};

export default SearchPersonCard;
