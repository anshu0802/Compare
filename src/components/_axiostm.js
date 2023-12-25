import axios from "axios";

const _axiostm = axios.create({
  baseURL: process.env.REACT_APP_BASEURL_TM,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

export const apiurllist = {
  event: "events",
};


export async function getEventtm(apikey,tmstate,tmcity,tmstd,tmedt) {
  try {
    const response = await _axiostm.get(apiurllist.event, {
      params: {
        apikey: apikey,
        state: tmstate,
        city: tmcity,
        startDateTime:tmstd,
        endDateTime:tmedt

      },
    });
    // console.log("Ticketmaster");
    // console.log(response.data); // Access the response data

    return response.data; // Return the response data, not the entire response object
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}
