import React, { useState, useEffect }from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditCoffeeForm({ handleSetCoffees }){
  const {id} = useParams();
  const navigate = useNavigate();
  const [coffeeInfo, setCoffeeInfo] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch(`/coffees/${id}`)
    .then(r => r.json())
    .then(coffee => setCoffeeInfo(coffee))
  }, []);

  function handleChange(e) {
    const key = e.target.name
    setCoffeeInfo({
      ...coffeeInfo,
      [key]: e.target.value
    });
  };

  function handleEditCoffeeSubmit(e){
    e.preventDefault();
    setErrors([]);
    fetch(`/coffees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coffeeInfo),
    })
    .then((r) => {
      if (r.ok){
        r.json()
        .then(updatedCoffees => {
          handleSetCoffees(updatedCoffees)
          navigate("/")})
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    });
  }


  console.log(coffeeInfo)
  return (
    <div className="editUserProfileContainer">
      {coffeeInfo ? <div className="editUserProfileContent">
      {/* <div className="errorsDiv">
      {errors.map(error => {
        return (
         <p className="errorMessage"><span className="material-icons">priority_high</span>{error}</p>
        )
      })}
    </div> */}
      <form className="editForm" onSubmit={handleEditCoffeeSubmit}>
      <div>
        <label>Name: <input className="formInput" type="text"  name="name"  autoComplete="off" value={coffeeInfo.name} onChange={handleChange}/></label>  
      </div>
      <div>
        <label>Description: <input className="formInput" type="text"  name="description"  value={coffeeInfo.description} onChange={handleChange}/></label>      
      </div>
      <div>
        <label>Image: <input className="formInput" type="text"  name="image"  value={coffeeInfo.image} onChange={handleChange}/></label> 
      </div>
      <div>
        <label>Price: <input className="formInput" type="text"  name="price"  value={coffeeInfo.price} onChange={handleChange}/></label> 
      </div>
      <button type="submit">Submit</button>
      </form>
      <button className="cancelButton" onClick={() => navigate(-1)}>Cancel</button>
      </div> : <h1>Loading...</h1>}
    </div>
  )
}

export default EditCoffeeForm