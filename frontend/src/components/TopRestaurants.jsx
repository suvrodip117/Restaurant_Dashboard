import axios from "axios";
import React, {useState, useRef} from "react";
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import {API_ROUTES} from "../utils/apiRoutes";
import axiosInstance from "../utils/axiosInstance";
import Container from "react-bootstrap/Container";

const TopRestaurants = () => {
  const [showTopRestaurants, setShowTopRestaurants] = useState(false);
  const [topThreeRestaurants, setTopThreeRestaurants] = useState([]);

  const startDateRef = useRef();
  const endDateRef = useRef();

  const topRestaurants = async () => {
    setShowTopRestaurants(true);
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;
    try {
      console.log("startDate-" + startDate);
      console.log("endDate-" + endDate);
      const response = await axiosInstance.get(
        API_ROUTES.GETTOPTHREERESTAURANTS,
        {params: {startDate: startDate, endDate: endDate}},
      );
      console.log(response.data);
      setTopThreeRestaurants(response.data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
      } else console.log("Something is wrong. Unable to fetch data");
    }
  };

  return (
    <Container
      fluid
      className="d-flex pt-2 mt-2 ms-3 border rounded shadow bg-white justify-content-center"
      style={{fontSize: "13px", height: "250px"}}
    >
      <div className="d-flex flex-column ">
        <p className="fw-semibold text-center" style={{fontSize: "16px"}}>
          Top 3 Restaurants
        </p>
        <div className="d-flex align-items-center gap-3">
          <Form.Control
            type="date"
            size="sm"
            style={{width: "120px", fontSize: "14px"}}
            ref={startDateRef}
          />
          <span> - </span>
          <Form.Control
            type="date"
            size="sm"
            style={{width: "120px", fontSize: "14px"}}
            ref={endDateRef}
          />
          <Button onClick={topRestaurants} style={{fontSize: "13px"}}>
            Search
          </Button>
        </div>
        {showTopRestaurants && (
          <Table bordered hover className="mt-2">
            <thead>
              <tr>
                <th>Restaurant Name</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topThreeRestaurants.map((restaurant, index) => {
                return (
                  <tr>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.revenue}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
    </Container>
  );
};

export default TopRestaurants;
