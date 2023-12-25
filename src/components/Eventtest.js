import React, { useState, useEffect } from 'react';
import { getEvent, getVenue } from './_axios'; // Replace with the path to your API file
import { getEventtm } from './_axiostm';
import TicketComparison from './TicketComparison';
import Filter from './Filter';
import Header from './Header';
import { Grid } from '@mui/material';

function Eventtest() {
  const [eventData, setEventData] = useState([]);
  const [venueData, setVenueData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState(null);
  const clientid = process.env.REACT_APP_CLIENT_IDSG;
  const [seatgeekEvent, setSeatgeekEvent] = useState([]);
  const [eventDatatm, setEventDatatm] = useState([]);
  const clientidtm = process.env.REACT_APP_CLIENT_IDTM;
  const [postal, setPostal] = useState(null);
  const [venueNames, setVenueNames] = useState([]);
  const [venueIds,setVenueIds] = useState();
  console.log("Top seatgeekEvent",seatgeekEvent)
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
          //need to remove
          //eventDatatm.map((eventDataValue) => ( eventDataValue._embedded.venues.map((ven) => (ven.name))))

          // Initialize an array to accumulate postal codes
          const postalCodeAndVenueNameArray = [];
          // const ticketmasterdatamapping={
          // };

          // Extract postal codes from eventDatatm
          data._embedded.events.forEach((eventDataValue) => {
            console.log("Ticket Master Event",eventDataValue)
           
            // ticketmasterdatamapping[eventDataValue.id] = {
            //   sgvenueid:"",
            //   sgeventid:[],
            // };
            eventDataValue._embedded.venues.forEach((ven) => {
              postalCodeAndVenueNameArray.push({
                postalCode: ven.postalCode,
                venueName: ven.name
              });
            });
          });

          console.log("postalCodeAndVenueNameArray",postalCodeAndVenueNameArray)
          // Function to fetch venues for each postal code one by one
          const fetchVenues = async (postalCodeAndVenueNameArray) => {
            // Check if there are any items in the array
  if (postalCodeAndVenueNameArray.length === 0) {
    console.log("No data to fetch");
    return;
  }
   // Take the first item from the array
  const { postalCode, venueName } = postalCodeAndVenueNameArray.map(async(data)=>{ 

    try {
      console.log("Postal code",data.postalCode)
      const venueData = await getVenue(client_idsg, data.postalCode, data.venueName);
     console.log("venuedata",venueData)
     
    // venueData.venues.map((venid)=>{
     
    // })
     fetchEventsFromSeatGeek(venueData.venues[0].id);
    // console.log("venids",venueIds)
      // Further processing if needed
      
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  });
    
    };

          // Call the function to fetch venues for each postal code
          fetchVenues(postalCodeAndVenueNameArray);
          
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [filterCriteria]);

  const handleFilter = (state, city, sdt, edt) => {
    // Handle the filter criteria, e.g., make API requests here
    setFilterCriteria({ state, city, sdt, edt });
  };
  const arr =[]
  const fetchEventsFromSeatGeek = (venueIds) => {
    if (filterCriteria) {
      const tmstd = "2023-12-28T03:00:00";
      const tmedt = "2023-12-29T03:00:00";
      const client_id = clientid;
  console.log("venue id",venueIds)
      // Convert an array of venueIds to a comma-separated string
     // const venueIdsString = venueIds.join(',');
  
      getEvent(client_id, venueIds, tmstd, tmedt)
  .then((seatgeekeventdata) => {
    
    arr.push(seatgeekeventdata.events)
   console.log("seatgeekevent",seatgeekeventdata.events)
})
  .catch((error) => {
    // Handle errors here
    console.error(error);
  });

    }
  };
  arr.length>0 && arr.map(data =>{
    setSeatgeekEvent(data)
  })
  console.log("seatgeekEvent down",seatgeekEvent)
  return (
    <div className="App">
      <Header />
      <Filter onFilter={handleFilter} />
      <TicketComparison eventData={eventData} eventDatatm={eventDatatm} />

      {filterCriteria && (
        <div>
          <h5>Filter Criteria</h5>
          <p>State: {filterCriteria.state}</p>
          <p>City: {filterCriteria.city}</p>
          <p>Start Date Time: {filterCriteria.sdt}</p>
          <p>End Date Time: {filterCriteria.edt}</p>
        </div>
      )}

      <Grid container spacing={2}>
  <Grid item xs={6}>
    <Grid>
 <h2>Ticket  Master Events</h2>
      <div className="card-container">
      {eventDatatm.map((item) => (
  <div className="card" key={item.id}>
    <h3>Event Name: {item.name}</h3>
    {item.priceRanges && Array.isArray(item.priceRanges) && item.priceRanges.length > 0 ? (
      <h3>
        {item.priceRanges.map((price) => (
          <div key={price.id}>Ticket Master Price: {price.min}</div>
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
 </Grid>
  </Grid>
  <Grid item xs={6}>


    <Grid> 
      <div className="card-container">
    <div className="card">
      
        <ul>
  {seatgeekEvent.length > 0 && seatgeekEvent.map((sgevent) => (
    <li>
      <ul>
            <li>Event Name: {sgevent.title}</li>
            <li>Venue Name: {sgevent.venue.name}</li>
            <li>Price: {sgevent.stats.lowest_sg_base_price}</li> 
      </ul>
    </li>
  ))}
</ul>

</div>
      </div>
</Grid>
  </Grid>

</Grid>


    </div>
  );
}

export default Eventtest;
