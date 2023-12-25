import React, { useState, useEffect } from 'react';
import { getEvent, getVenue } from './_axios'; // Replace with the path to your API file
import { getEventtm } from './_axiostm';
import TicketComparison from './TicketComparison';
import Filter from './Filter';
import Header from './Header';

function Eventtest() {
  const [eventData, setEventData] = useState([]);
  const [venueData, setVenueData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState(null);
  const clientid = process.env.REACT_APP_CLIENT_IDSG;

  const [eventDatatm, setEventDatatm] = useState([]);
  const clientidtm = process.env.REACT_APP_CLIENT_IDTM;
  const [postal, setPostal] = useState(null);

  useEffect(() => {
    if (filterCriteria) {
      const client_idtm = clientidtm;
      const client_idsg = clientid;
      const tmstate = filterCriteria.state;
      const tmcity = filterCriteria.city;
      const tmstd = filterCriteria.sdt;
      const tmedt = filterCriteria.edt;

      getEventtm(client_idtm, tmstate, tmcity, tmstd, tmedt)
        .then((data) => {
          // Set eventDatatm
          setEventDatatm(data._embedded.events);

          // Initialize an array to accumulate postal codes
          const postalCodeArray = [];

          // Extract postal codes from eventDatatm
          data._embedded.events.forEach((eventDataValue) => {
            eventDataValue._embedded.venues.forEach((postal) => {
              postalCodeArray.push(postal.postalCode);
            });
          });
console.log()
          // Function to fetch venues for each postal code one by one
          const fetchVenues = async () => {
            for (const postalCode of postalCodeArray) {
              try {
                const venueData = await getVenue(client_idsg, postalCode, 'Sphere');
                console.log(postalCode);
                // Handle the data for this postal code
                console.log("Venue");
                venueData.venues.map((venueid) => {
                  console.log(venueid.id);
                });
                venueData.venues.forEach((venue) => {
                  fetchEventsFromSeatGeek(venue.id);
                });
              } catch (error) {
                // Handle errors for this postal code
                console.error(`Error for postal code ${postalCode}: ${error}`);
              }
            }
          };

          // Call the function to fetch venues for each postal code
          fetchVenues();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [filterCriteria]);

  const handleFilter = (state, city, sdt, edt) => {
    // Handle the filter criteria, e.g., make API requests here
    setFilterCriteria({ state, city, sdt, edt });

    // Perform any relevant search operations here
    // You can update the state and make API requests here
  };

  const fetchEventsFromSeatGeek = (venueId) => {
    if (filterCriteria) {
      const tmstd = "2023-10-21T03:00:00";
      const tmedt = "2023-10-21T03:00:00";
      const client_id = clientid;
      getEvent(client_id, venueId, tmstd, tmedt)
        .then((seatgeekevent) => {
          // Handle the data here
          console.log("Seatgeek event");
          console.log(seatgeekevent);
        })
        .catch((error) => {
          // Handle errors here
          console.error(error);
        });
    }
  };

  return (
    <div className="App">
      <Header />
      <Filter onFilter={handleFilter} />
      <TicketComparison eventData={eventData} eventDatatm={eventDatatm} />

      {filterCriteria && (
        <div>
          <h2>Filter Criteria</h2>
          <p>State: {filterCriteria.state}</p>
          <p>City: {filterCriteria.city}</p>
          <p>Start Date Time: {filterCriteria.sdt}</p>
          <p>End Date Time: {filterCriteria.edt}</p>
        </div>
      )}

      <h2>Ticket  Master Events</h2>
      <div className="card-container">
      {eventDatatm.map((item) => (
  <div className="card" key={item.id}>
    <h3>Event Name: {item.name}</h3>
    {item.priceRanges && Array.isArray(item.priceRanges) && item.priceRanges.length > 0 ? (
      <h3>
        {item.priceRanges.map((price) => (
          <div key={price.id}>Price: {price.min}</div>
        ))}
      </h3>
    ) : (
      <p>Price information not available</p>
    )}
    {/* <p>Date: {item.dates.start.localDate}</p> */}
    {item._embedded.venues && item._embedded.venues.length > 0 ? (
      <p>
        Venue Name:
        {item._embedded.venues.map((ven) => (
          <div key={ven.id}>{ven.name}</div>
        ))}
      </p>
    ) : (
      <p>Venue information not available</p>
    )}
  </div>
))}


      </div>
    </div>
  );
}

export default Eventtest;
