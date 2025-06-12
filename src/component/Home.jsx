import React from "react";
import Todo from "../component/Todo";
import "./Home.css";
import NewTaskmodal from "./NewTaskmodal";

const Home = () => {
  return (
    <div className="home-container">
      <Todo />
      <NewTaskmodal />
    </div>
  );
};
export default Home;
