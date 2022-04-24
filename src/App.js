import React, { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Card from "./Components/Card/Card";
import "./App.css";
import axios from "axios";

function App(props) {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "https://demo3755793.mockable.io/plans",
      });

      let data = await res.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Buy a plan and be Interview ready!</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `1fr 1fr 1fr 1fr`,
            width: "100%",
            overflow: "scroll",
            height: "100%",
            paddingBottom: "100px",
          }}
        >
          <Card data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
