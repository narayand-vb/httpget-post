import React, { useState, useEffect } from "react";
import axios from "axios";

const HttpReq = () => {
  const [state, setState] = useState([]);

  const [inputData, setinputData] = useState({
      first_name : "",
      last_name : "",
      email : ""
  })

  function inputHandle(event){
    const name = event.target.name;
    const value = event.target.value;
    setinputData({ ...inputData, [name]: value });
     
  }


  async function fetchPosts() {
    try {
      const request = await axios.get("https://reqres.in/api/users?page=2");
      const data = await request.data;
      setState(data.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function submitForm(e){
    e.preventDefault();
    const newRecord = {
      id: state.length + 1,
      ...inputData,
    };
      try{
    await axios.post('https://reqres.in/api/uses', newRecord)
        .then(response =>setState([...state, newRecord]));
      } catch (error) {
        console.log("not found");
      }
      setinputData({ first_name : "",
      last_name : "",
      email : ""});
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
     <form action="" onSubmit={submitForm} className="form">
        <input type="text" placeholder="Enter your First Name" name ="first_name" onChange={inputHandle} value={inputData.first_name}/>
        <input type="text" placeholder="Enter your Second Name" name ="last_name" onChange={inputHandle} value={inputData.last_name}/>
        <input type="email" placeholder="Enter your email" name ="email" onChange={inputHandle} value={inputData.email}/>
        <button type="submit"> Submit </button>
      </form>
      {state.map((d, index) => {
        return (
          <>
            <ul className="ul">
              <li className="name">
                {d.first_name} {d.last_name}
              </li>
              <li className="email">{d.email}</li>
            </ul>
          </>
        );
      })}

     
    </>
  );
};

export default HttpReq;
