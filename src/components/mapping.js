// Inside your component
const combinedEvents = [];

// Combine events based on a common identifier (e.g., venue name)
eventDatatm.forEach((ticketmasterEvent) => {
  const matchingSeatGeekEvent = seatgeekEvent.find(
    (sgevent) => sgevent.events.some((data) => data.venue.name === ticketmasterEvent._embedded.venues[0].name)
  );

  if (matchingSeatGeekEvent) {
    combinedEvents.push({
      ticketmasterEvent,
      seatgeekEvent: matchingSeatGeekEvent.events,
    });
  }
});

// Render the combined events
return (
  <div>
    {combinedEvents.map((combinedEvent, index) => (
      <div key={index}>
        <h2>Ticket Master Event</h2>
        <p>Event Name: {combinedEvent.ticketmasterEvent.name}</p>
        {/* Render other Ticketmaster event details */}
        
        <h2>SeatGeek Events</h2>
        <ul>
          {combinedEvent.seatgeekEvent.map((sgevent, sgeventIndex) => (
            <li key={sgeventIndex}>
              <p>Event Name: {sgevent.title}</p>
              {/* Render other SeatGeek event details */}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);
