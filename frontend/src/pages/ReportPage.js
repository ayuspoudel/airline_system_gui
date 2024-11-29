import React, { useState, useEffect } from "react";
import api from "../services/api";

function ReportsPage() {
  const [selectedView, setSelectedView] = useState(
    "delayedflightswithcustomers"
  );
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetchReportData();
  }, [selectedView]);

  const fetchReportData = async () => {
    try {
      const response = await api.get(`/views/${selectedView}`);
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  return (
    <div>
      <h2>View Reports</h2>
      <select
        onChange={(e) => setSelectedView(e.target.value)}
        value={selectedView}
      >
        <option value="delayedflightswithcustomers">
          Delayed Flights with Customers
        </option>
        <option value="flightcrewbookingdetails">
          Flight Crew Booking Details
        </option>
        <option value="membercontactinfo">Member Contact Info</option>
        <option value="paymentaggregationbydestination">
          Payment Aggregation by Destination
        </option>
      </select>
      {reportData.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(reportData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available for the selected view.</p>
      )}
    </div>
  );
}

export default ReportsPage;
