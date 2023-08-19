import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

function NewCoffeeForm({ handleSetCoffees, handleSetCoffeeDetail}){
  const navigate = useNavigate();
  const[coffeeCreated, setCoffeeCreated] = useState(false);
  const [coffeeInfo, setCoffeeInfo] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    calories: '',
    hot: true
  });
  const [coffeeDetails, setCoffeeDetails] = useState({
    coffee_id: '',
    espresso_shots: '0',
    milk: '',
    syrup: '',
    syrup_pumps: '0'
  });
  const [errors, setErrors] = useState([]);

  function handleCoffeeChange(e) {
    const key = e.target.name
    setCoffeeInfo({
      ...coffeeInfo,
      [key]: e.target.value
    })
  };

  function handleCoffeeDetailChange(e){
   const key = e.target.name
    setCoffeeDetails({
      ...coffeeDetails,
      [key]: e.target.value
    })
  }

  function handleCoffeeSubmit(e){
    e.preventDefault();
    setErrors([]);
    fetch("/coffees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...coffeeInfo,
        calories: Number(coffeeInfo.calories),
        price: Number(coffeeInfo.price)
      }),
    })
    .then((r) => {
      if (r.ok){
        r.json()
        .then((coffee) => { 
          handleSetCoffees(coffee)
          setCoffeeDetails({
            ...coffeeDetails,
            coffee_id: coffee.id
          })
          setCoffeeCreated(true)})
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    })
  }

  function handleCoffeeDetailSubmit(e){
    e.preventDefault();
    setErrors([]);
    fetch("/coffee_details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coffeeDetails),
    })
    .then((r) => {
      if (r.ok){
        r.json()
        .then((coffee_detail) => { 
          handleSetCoffeeDetail(coffee_detail)
          setCoffeeCreated(false)
          navigate('/dashboard')})
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    })
  }

  return(
    <div>
      {!coffeeCreated ? 
      <div>
        <form className="editForm" onSubmit={handleCoffeeSubmit}>
      <div>
        <label>Name: <input className="formInput" type="text"  name="name"  autoComplete="off" value={coffeeInfo.name} onChange={handleCoffeeChange}/></label>  
      </div>
      <div>
        <label>Description: <input className="formInput" type="text"  name="description"  value={coffeeInfo.description} onChange={handleCoffeeChange}/></label>      
      </div>
      <div>
        <label>Image: <input className="formInput" type="text"  name="image"  value={coffeeInfo.image} onChange={handleCoffeeChange}/></label> 
      </div>
      <div>
        <label>Price: <input className="formInput" type="text"  name="price"  value={coffeeInfo.price} onChange={handleCoffeeChange}/></label> 
      </div>
      <div>
        <label>Calories: <input className="formInput" type="text"  name="calories"  value={Number(coffeeInfo.calories)} onChange={handleCoffeeChange}/></label> 
      </div>
      <div>
        <label>Hot or Cold:
          <select 
            onChange={handleCoffeeChange}
            value={coffeeInfo.hot} 
            name="hot">
              <option value={Boolean(true)}>Hot</option>
              <option value={Boolean(false)}>Cold</option>
          </select> 
        </label>
      </div>
      <button type="submit">Create Coffee</button>
      </form>
      <button className="cancelButton" onClick={() => navigate(-1)}>Cancel</button>
      </div> 
      : 
      <div>
        <form className="editForm" onSubmit={handleCoffeeDetailSubmit}>
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
              <option value='No'>None</option>
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
      <button type="submit">Create Details</button>
      </form>
      <button className="noDetailButton" onClick={() => {
        setCoffeeCreated(false)
        navigate('/dashboard')}}>No Details</button>
      </div>}
    </div>
  )
}

export default NewCoffeeForm