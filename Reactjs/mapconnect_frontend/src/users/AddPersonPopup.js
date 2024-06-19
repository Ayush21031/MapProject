// // AddPersonPopup.js
// import React, {useState} from "react";
// import "./AddPersonPopup.css";
// import { IoMdClose } from "react-icons/io";
// import { person_data } from "./data";
// import SearchPersonCard from "./SearchPersonCard";
// const AddPersonPopup = ({ onClose }) => {

// const [search, setSearch] = useState(0);

//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <button className="close-button" onClick={onClose}>
//           <IoMdClose />
//         </button>
//         <h2>Add a new person</h2>
//         <input type="text" placeholder="Enter name" className="popup-input" />
//         <button className="popup-add-button" onClick={setSearch(1)}>Search</button>
//       </div>

//       <div className="search-people-list">
//         <SearchPersonCard />
//       </div>
//     </div>
//   );
// };

// export default AddPersonPopup;





// AddPersonPopup.js
import React, { useState } from "react";
import "./AddPersonPopup.css";
import { IoMdClose } from "react-icons/io";
import { person_data } from "./data";
import SearchPersonCard from "./SearchPersonCard";

const AddPersonPopup = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = person_data.filter(person =>
      person.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2>Search for a person</h2>
        <input
          type="text"
          placeholder="Enter name"
          className="popup-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="popup-search-button" onClick={handleSearch}>
          Search
        </button>
        <div className="search-people-list">
          {searchResults.map((person, index) => (
            <SearchPersonCard key={index} person={person} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPersonPopup;
