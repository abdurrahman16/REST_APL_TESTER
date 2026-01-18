import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );

        setData(response.data);
      } catch (err) {
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // ✅ CLEANUP GOES HERE
    return () => controller.abort();
  }, []);

  return (
    <div className="App">
      <h1>API TESTER PROJECT BY RAHMAN ABDUR</h1>

      <input
        type="text"
        placeholder="Search Users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}

      {data
        .filter((u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.address.city}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
