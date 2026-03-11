import React, {useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import OrderTrends from "./OrderTrends";
import axiosInstance from "../utils/axiosInstance";
import {API_ROUTES} from "../utils/apiRoutes";

const RestaurantList = ({selectedRecord}) => {
  useEffect(() => {
    populateRestaurantList();
  }, []);

  const [data, setData] = useState([]);
  const [records, setRecords] = useState();

  const columns = [
    {name: "ID", selector: (row) => row.id, sortable: true},
    {name: "Name", selector: (row) => row.name, sortable: true},
    {name: "Location", selector: (row) => row.location, sortable: true},
    {name: "Cuisine", selector: (row) => row.cuisine, sortable: true},
  ];

  const populateRestaurantList = async () => {
    try {
      console.log(
        "populateRestaurantList called" + API_ROUTES.GETALLRESTAURANTS,
      );
      const response = await axiosInstance.get(API_ROUTES.GETALLRESTAURANTS);
      console.log(response.data);
      setData(response.data);
      setRecords(response.data);
    } catch (error) {
      if (error.response && error.response.data.message)
        console.log(error.response.data.message);
      else console.log("Some other issue has occured");
    }
  };

  const filterRecords = (e) => {
    console.log(e.target.value);
    const newData = data.filter((row) =>
      row.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setRecords(newData);
  };

  const handleRestaurantRowClicked = (row) => {
    selectedRecord(row);
  };

  return (
    <div style={{width: "1000px"}} className="mt-2 border rounded shadow">
      <input
        placeholder="Search restaurant"
        type="text"
        className="form-control"
        onChange={filterRecords}
      />
      {console.log("restaurants---" + records)}
      <DataTable
        columns={columns}
        data={records}
        pagination
        paginationPerPage={5}
        paginationComponentOptions={{noRowsPerPage: true}}
        highlightOnHover
        dense
        pointerOnHover
        onRowClicked={handleRestaurantRowClicked}
        persistTableHead={true}
        fixedHeader={true}
      />
    </div>
  );
};

export default RestaurantList;
