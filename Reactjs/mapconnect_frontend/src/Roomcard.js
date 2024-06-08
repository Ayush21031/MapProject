import React, {useEffect, useState, useMemo,} from 'react';
import { useNavigate } from 'react-router-dom';
import './Roomcard.css';



function Roomcard({room_id}) {

   const navigate = useNavigate();

    const connect_user_to_room = async () => {
        // alert("Joining room " + room_id);
        const useremail = localStorage.getItem("email");
        const data = {
            email: useremail,
            roomid: room_id,
        };

        // navigate to /room
        navigate('/room', { state: { roomid: room_id } });



    }

    const remove_user_from_room = async () => {
        alert("Leaving room " + room_id);
    }



  return (
    <div className="roomcard">
      <div className="roomcard__info">
        <h2>{room_id}</h2>
        <p>Room Description</p>
      </div>
      <div className="roomcard__buttons">
        <button onClick={connect_user_to_room}>Connect</button>
        <button onClick={remove_user_from_room}>Leave</button>
      </div>
    </div>
  );
}

export default Roomcard;