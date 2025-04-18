import React, {useState, useEffect} from "react";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import './main.css';

function Main() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
        <Heading/>
        <p style={{color: 'black'}}>{message}</p>
        <Footer/>
  </div>
  );
}

export default Main;
