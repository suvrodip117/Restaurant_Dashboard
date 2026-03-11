import React, {useState} from "react";
import RestaurantList from "./RestaurantList";
import TopRestaurants from "./TopRestaurants";
import OrderTrends from "./OrderTrends";
import {Container, Card} from "react-bootstrap";

const RestaurantHomePage = () => {
  const [restaurant, setRestaurant] = useState();

  const getSelectedRecord = (restaurantSelected) => {
    setRestaurant(restaurantSelected);
  };
  return (
    <Container fluid className="p-0">
      <Card
        style={{
          fontSize: "30px",
          backgroundColor: "steelblue ",
          color: "white",
        }}
        className="p-2 rounded-0 fw-semibold"
      >
        RESTAURANT DASHBOARD
      </Card>

      <Container fluid className="d-flex gap-5">
        <div>
          <RestaurantList selectedRecord={getSelectedRecord} />
        </div>
        <div className="">
          <TopRestaurants />
        </div>
      </Container>
      {restaurant && (
        <Container fluid className="px-3">
          <OrderTrends
            selectedRestaurantName={restaurant.name}
            selectedRestaurantID={restaurant.id}
          />
        </Container>
      )}
    </Container>
  );
};

export default RestaurantHomePage;
