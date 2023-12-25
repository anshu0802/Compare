// src/components/TicketComparison.js
import React, { useState } from 'react';
import {
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import './TicketComparison.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Eventtest from './Eventtest';
function TicketComparison({ eventData }) {
  const [website1Price, setWebsite1Price] = useState(null);
  const [website2Price, setWebsite2Price] = useState(null);
  const [website3Price, setWebsite3Price] = useState(null);
  const [website4Price, setWebsite4Price] = useState(null); // Add more state variables for additional websites
 
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [sdt, setSdt] = useState('');
  const [edt, setEdt] = useState('');

  // console.log(eventData)
  const fetchTicketPrices = async () => {
    try {
      // Replace 'api-url-1', 'api-url-2', 'api-url-3', 'api-url-4', etc. with actual API endpoints
      const response1 = await fetch("api-url-1");
      const data1 = await response1.json();
      setWebsite1Price(data1.price);

      const response2 = await fetch('api-url-2');
      const data2 = await response2.json();
      setWebsite2Price(data2.price);

      const response3 = await fetch('api-url-3'); // Add more fetch calls for additional websites
      const data3 = await response3.json();
      setWebsite3Price(data3.price);

      const response4 = await fetch('api-url-4'); // Add more fetch calls for additional websites
      const data4 = await response4.json();
      setWebsite4Price(data4.price);
    } catch (error) {
      console.error('API call error:', error);
    }
    fetchTicketPrices()
  };

  
  return (
    <div>
 <Container className="container" minWidth="md">
        
        <Typography variant="h4" gutterBottom>
          Popular Events
        </Typography>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={fetchTicketPrices}
        >
          Compare Prices
        </Button> */}
        <Grid container spacing={3} className="result-container">
          <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography variant="h6" gutterBottom>
         Football Event
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
        Canada vs Italy
        </Typography>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://cdn.pixabay.com/photo/2016/05/20/21/57/football-1406106_1280.jpg" // Replace with actual image URL
                alt="Website 1"
              />
              <CardContent>
                <Button style={{color:"green",backgroundColor:"rgb(235, 189, 77)",marginBottom:"2px"}} >Ticket Master Price: $100</Button>
                <div></div>
                <Button style={{color:"green",backgroundColor:"rgb(235, 189, 77)",marginTop:"2px"}}>Seatgeek Price: $80</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography variant="h6" gutterBottom>
         Concert Event
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
        Justin Bieber
        </Typography>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://plus.unsplash.com/premium_photo-1681830630610-9f26c9729b75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" // Replace with actual image URL
                alt="Website 1"
              />
             <CardContent>
                <Button style={{color:"green",backgroundColor:"rgb(235, 189, 77)",marginBottom:"2px"}} >Ticket Master Price: $100</Button>
                <div></div>
                <Button style={{color:"green",backgroundColor:"rgb(235, 189, 77)",marginTop:"2px"}}>Seatgeek Price: $80</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography variant="h6" gutterBottom>
         Stand-up Comedy
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
        Chris Rock
        </Typography>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://img.freepik.com/free-vector/stand-up-comedy-banner-with-vintage-microphone_1308-80026.jpg?w=740&t=st=1693799586~exp=1693800186~hmac=f46bdd83edae7b97c978d32dec6f2b3e1fcb907168cfda30bebb9291fe22a3c1" // Replace with actual image URL
                alt="Website 1"
              />
             <CardContent>
                <Button style={{color:"green",backgroundColor:"rgb(235, 189, 77)",marginBottom:"2px"}} >Ticket Master Price: $100</Button>
                <div></div>
                <Button style={{color:"green",backgroundColor:"rgb(235, 189, 77)",marginTop:"2px"}}>Seatgeek Price: $80</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography variant="h6" gutterBottom>
        Art & Theater
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
        Bill Burr
        </Typography>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://image.slidesharecdn.com/theater-150224073929-conversion-gate02/75/theater-arts-1-2048.jpg?cb=1665816759" // Replace with actual image URL
                alt="Website 1"
              />
             <CardContent>
                <Button style={{color:"white",backgroundColor:"rgb(235, 189, 77)",marginBottom:"2px"}} >Ticket Master Price: $100</Button>
                <div></div>
                <Button style={{color:"white",backgroundColor:"rgb(235, 189, 77)",marginTop:"2px"}}>Seatgeek Price: $80</Button>
              </CardContent>
            </Card>
          </Grid>
          {/* Add more Grid items for additional websites */}
        </Grid>
        
      </Container>
          </div>
  );
}

export default TicketComparison;
