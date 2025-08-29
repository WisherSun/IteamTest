import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    framework: '',
    frameworkVersion: '',
    email: '',
    hobbies: [
      {name: '', 
      duration: ''}]
  });


  const frameworks = {       
          angular: ['1.1.1', '1.2.1', '1.3.3'],
          react: ['2.1.2', '3.2.4', '4.3.1'],
          vue: ['3.3.1', '5.2.1', '5.1.3'],
      }

  const handleHobbyChange = (index, field, value) => {
    const newHobbies = [...formData.hobbies];
    newHobbies[index][field] = value;
    setFormData({ ...formData, hobbies: newHobbies });
  };

  const addHobby = () => {
    setFormData({
      ...formData,
      hobbies: [...formData.hobbies, { name: "", duration: "" }],
    });
  };

  const removeHobby = (index) => {
    const newHobbies = formData.hobbies.filter((_, i) => i !== index);
    setFormData({ ...formData, hobbies: newHobbies });
  };

  const validate = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)

  const handleSubmit = () => {
    if (formData.email === "test@test.test"){
      alert('The email already exists')
    }
    else if (validate()) {
      console.log(formData);
    } else {
      alert("Invalid email format");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
      <h3 style={{textAlign:'center'}}> Information</h3>

      <p>Your name</p>

      <input
        className="input"
        type="text"
        name="firstName"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
      />

      <p> Your lastname</p>

      <input
        className="input"
        type="text"
        name="lastName"
        placeholder="Your lastname"
        value={formData.lastName}
        onChange={handleChange}
      />

      <p>Your email</p>

      <input
        className="input"
        type="email"
        name="email"
        placeholder="Your email"
        value={formData.email}
        onChange={handleChange}
      />

      <p>Date of birth</p>

      <input
        className="input"
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
      />

      <div className='frameworks'>
        <h3>Frameworks</h3>
          <select
        className="input"
        name="framework"
        value={formData.framework}
        onChange={handleChange}
      >
        <option value="">Select framework</option>
        {Object.keys(frameworks).map((fw) => (
          <option key={fw} value={fw}>
            {fw}
          </option>
        ))}
        </select>

        <select
          className="input"
          name="frameworkVersion"
          value={formData.frameworkVersion}
          onChange={handleChange}
          disabled={!formData.framework}
        >
          <option value="">Select version</option>
          {formData.framework &&
            frameworks[formData.framework].map((ver) => (
              <option key={ver} value={ver}>
                {ver}
              </option>
            ))}
        </select>
      </div>

  <div className='hobbies'>
          <h3>Hobbies</h3>
      {formData.hobbies.map((hobby, index) => (
        <div 
        className="hobby"
        key={index}>
          <input
            className="input"
            type="text"
            placeholder="Hobby name"
            value={hobby.name}
            onChange={(e) =>
              handleHobbyChange(index, "name", e.target.value)
            }
          />
          <input
            className="input"
            type="text"
            placeholder="Duration"
            value={hobby.duration}
            onChange={(e) =>
              handleHobbyChange(index, "duration", e.target.value)
            }
          />

          <button type="button" onClick={() => removeHobby(index)}>
            Remove
          </button>
        </div>
      ))}
      <button 
      className='addHobby'
      type="button" 
      onClick={addHobby}>
        Add Hobby
      </button>
  </div>
      

      <button 
        className="sendForm"
        onClick = { formData.firstName == '' || formData.lastName == '' || formData.dateOfBirth == '' || formData.framework == '' || formData.frameworkVersion == '' || formData.email == '' ? ()=> {alert("Please fill in all fields!")} : handleSubmit}       
        >
        Send form 
        </button>
    </>
  );
}


export default App;
