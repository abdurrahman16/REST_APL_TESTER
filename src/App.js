import { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {


  //first state to hold data
const [data, setData] = useState([]);
const [loading, setLoading] = useState (false); 
const [error, setError] = useState (false);


const fetchData = async () => 
  {
        try {
          setLoading (true);
          setError (false);
          const response = await axios.get('https://jsonplaceholder.typicode.com/users');
          setData (response.data);
          setLoading (false);

            } 



        catch (error) {
          setError(true);
          setLoading (false);
          
        }
  }




  //2nd useEffect to call fetch data
        useEffect(() => {
        fetchData ();
        }, []);





/*3rd showing data from lower div here */

  return (
    <div className="App">
      <header className="App-header">
        <h1>API TESTER PROJECT BY RAHMAN ABDUR</h1>
        <h3>
  {error
    ? "Something went wrong while fetching users"
    : loading
    ? "Loading users..."
    : "Total Number of Users:" + data.length
  }
</h3>
        <hr/>
        
      </header>


<div className="data-container">
  {data.map((users) => (
  
  <div className="user-grid">
  {data.map((users) => (
    <div className="user-card" key={users.id}>
      <h2 className="user-name">👨🏻‍💼{users.name}</h2>
      <p><strong>✉︎ Email:</strong>{users.email}</p>
      <p><strong>📍City:</strong>{users.address.city}</p>
    </div>
  ))}
</div>




  ))}
</div>






    </div>
  );
}

export default App;
