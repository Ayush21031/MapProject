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
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ContactContext } from "../context/ContactContext";

const SearchPersonCard = ({ person }) => {

  const { userData } = useContext(UserContext);
  const { fetchContacts } = useContext(ContactContext);
const handleAdd = async () => {
  const response = await fetch('http://localhost:3000/user/addchat/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "participant1": person.email, "participant2": userData.email}),
    credentials: 'include'
  });

  const data = await response.json();
  console.log('Add contact response:', data);
  fetchContacts(userData.email);
}


  return (
    <div className="person-card">
      <div className="person-card-info">
        <div className="person-card-name">{person.firstName} {person.lastName}</div>
        <div className="person-card-email">{person.email}</div>
      </div>
      <button className="person-card-add-btn" onClick={handleAdd}>Add</button>
    </div>
  );
};

export default SearchPersonCard;
