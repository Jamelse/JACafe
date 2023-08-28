import React, { useState, useEffect }from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditCoffeeForm({ handleSetCoffees, handleSetCoffeeDetail }){
  const {id} = useParams();
  const navigate = useNavigate();
  const [coffeeInfo, setCoffeeInfo] = useState(null);
  const [coffeeDetails, setCoffeeDetails] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch(`/coffees/${id}`)
    .then(r => r.json())
    .then(coffee => {
      setCoffeeInfo(coffee)
      setCoffeeDetails(coffee.coffee_detail)})
  }, []);

  function handleChange(e) {
    const key = e.target.name
    setCoffeeInfo({
      ...coffeeInfo,
      [key]: e.target.value
    });
  };

  function handleCoffeeDetailChange(e){
    const key = e.target.name
     setCoffeeDetails({
       ...coffeeDetails,
       [key]: e.target.value
     })
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
        .then(updatedCoffee => {
          handleSetCoffees(updatedCoffee)
          navigate("/dashboard/products")})
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    });
  };

  function handleEditCoffeeDetailSubmit(e){
    e.preventDefault();
    setErrors([]);
    fetch(`/coffee_details/${coffeeInfo.coffee_detail.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coffeeDetails),
    })
    .then((r) => {
      if (r.ok){
        r.json()
        .then(updatedDetail => {
          handleSetCoffeeDetail(updatedDetail)
          navigate("/dashboard/products")})
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    });
  };

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
      </div> : <h1>Loading...</h1>}
      {coffeeDetails ? <div>
        <form className="editForm" onSubmit={handleEditCoffeeDetailSubmit}>
      <div>
        <label>Espresso Shots:
          <select 
            onChange={handleCoffeeDetailChange}
            value={coffeeDetails.espresso_shots} 
            name="espresso_shots">
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
          </select> 
        </label>
      </div>
      <div>
        <label>Milk:
          <select 
            onChange={handleCoffeeDetailChange}
            value={coffeeDetails.milk} 
            name="milk">
              <option value="No">None</option>
              <option value='2%'>2% Milk</option>
              <option value='Fat-free'>Fat-free Milk</option>
              <option value='Whole'>Whole Milk</option>
              <option value='Almond'>Almond Milk</option>
              <option value='Oat'>Oat Milk</option>
              <option value='Soy'>Soy Milk</option>
              <option value='Coconut'>Coconut Milk</option>
          </select>
        </label>      
      </div>
      <div>
        <label>Syrup: <input className="formInput" type="text"  name="syrup"  value={coffeeDetails.syrup} onChange={handleCoffeeDetailChange}/></label>      
      </div>
      <div>
        <label>Syrup Pumps:
          <select 
            onChange={handleCoffeeDetailChange}
            value={coffeeDetails.syrup_pumps} 
            name="syrup_pumps">
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
          </select> 
        </label> 
      </div>
      <button type="submit">Submit</button>
      </form>
      </div> : null}
      <button className="cancelButton" onClick={() => navigate(-1)}>Cancel</button>
    </div>
  )
}

export default EditCoffeeForm