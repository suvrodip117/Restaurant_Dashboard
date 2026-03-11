import axios from "axios";
import React, {useState, useRef} from "react";
import {Button, ButtonGroup, DropdownButton} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import {API_ROUTES} from "../utils/apiRoutes";
import axiosInstance from "../utils/axiosInstance";
import TrendGraphs from "./TrendGraphs";
import Container from "react-bootstrap/Container";

const OrderTrends = ({selectedRestaurantName, selectedRestaurantID}) => {
  const [displayBtnGroup, setDisplayBtnGroup] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chosenGraphType, setChosenGraphType] = useState(null);
  const [peakOrderHour, setPeakOrderHour] = useState([]);
  const [chartTitle, setChartTitle] = useState(null);

  const startDateRef = useRef();
  const endDateRef = useRef();

  const handleTrendButtonClick = async (graphType) => {
    console.log(chartData);
    console.log(peakOrderHour);
    setShowChart(true);
    setChosenGraphType(graphType);
    console.log("graphType" + graphType);
  };

  const getOrderTrendsData = async () => {
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;
    setDisplayBtnGroup(true);
    const dailyOrderDetailsResponse = await axiosInstance.get(
      API_ROUTES.GETDAILYORDERDETAILS,
      {
        params: {
          restaurantId: selectedRestaurantID,
          startDate: startDate,
          endDate: endDate,
        },
      },
    );

    const peakOrderHourResponse = await axiosInstance.get(
      API_ROUTES.GETPEAKORDERHOUR,
      {
        params: {
          restaurantId: selectedRestaurantID,
          startDate: startDate,
          endDate: endDate,
        },
      },
    );
    console.log(dailyOrderDetailsResponse.data);
    console.log("peak--", peakOrderHourResponse.data);
    setChartData(dailyOrderDetailsResponse.data);
    setPeakOrderHour(peakOrderHourResponse.data);
  };

  return (
    <div
      style={{height: "100%", fontSize: "16px"}}
      className="mt-2 border rounded shadow bg-white"
    >
      <div className="d-flex gap-2 mt-1 ms-3 " style={{fontSize: "16px"}}>
        <span className="fw-bold">{selectedRestaurantName} - </span>
        <span>Order Trends</span>
        <div className="d-flex gap-2 ms-auto justify-content-end pe-4">
          <span className="fw-semibold">Date Range:</span>
          <Form.Control
            type="date"
            size="sm"
            style={{width: "120px", height: "30px", fontSize: "13px"}}
            ref={startDateRef}
          />
          <span>-</span>
          <Form.Control
            type="date"
            size="sm"
            style={{width: "120px", height: "30px", fontSize: "13px"}}
            ref={endDateRef}
          />
          <Button onClick={getOrderTrendsData} style={{fontSize: "12px"}}>
            Find Trends
          </Button>
        </div>
      </div>

      <div className="d-flex ms-2 mb-2 gap-4 " style={{height: "350px"}}>
        {displayBtnGroup && (
          <ButtonGroup vertical className="gap-2 mt-3 " size="sm">
            <Button
              variant="secondary"
              onClick={() => {
                handleTrendButtonClick("DOC");
                setChartTitle("Daily Order Count");
              }}
            >
              Daily Orders Count
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                handleTrendButtonClick("DR");
                setChartTitle("Daily Revenue");
              }}
            >
              Daily Revenue
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                handleTrendButtonClick("AOV");
                setChartTitle("Average Order Value");
              }}
            >
              Average Order Value
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleTrendButtonClick("POH")}
            >
              Peak Order Hour
            </Button>
          </ButtonGroup>
        )}
        <div className="border-start" style={{height: "350px"}}></div>
        {showChart && (
          <TrendGraphs
            chartData={chartData}
            chosenGraphType={chosenGraphType}
            peakOrderHour={peakOrderHour}
            chartTitle={chartTitle}
          />
        )}
      </div>
    </div>
  );
};

export default OrderTrends;
