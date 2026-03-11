import {useState} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RestaurantHomePage from "./components/RestaurantHomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <style>{`body { background-color: #F5F5F5; }`}</style>
      <RestaurantHomePage />
    </>
  );
}

export default App;
