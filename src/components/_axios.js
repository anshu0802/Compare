import axios from "axios";

const _axios = axios.create({
  baseURL: process.env.REACT_APP_BASEURL_SG,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

export const apiurllist = {
  event: "2/events",
venues:"2/venues"
};


export async function getEvent(client_id,venueid,datetime_gutc,datetime_lutc) {
  try {
    const response = await _axios.get(apiurllist.event, {
      params: {
        client_id: client_id,
        'venue.id': venueid,
        "datetime_utc.gte":datetime_gutc,
        "datetime_utc.lte":datetime_lutc,
      },
    });
   

    return response.data; // Return the response data, not the entire response object
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}
export async function getVenue(client_id,postalCode,query) {
  try {
    const response = await _axios.get(apiurllist.venues, {
      params: {
        client_id: client_id,
        postal_code:postalCode,
        q:query
      },
    });
    // console.log("Seatgeek");
    // console.log(response.data); // Access the response data

    return response.data; // Return the response data, not the entire response object
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}
