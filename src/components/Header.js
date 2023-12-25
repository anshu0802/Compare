import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

function Header() {
  return (
    <AppBar position="static"style={{alignContent:"center",backgroundColor:"rgb(235, 189, 77)"}}>
        <Toolbar>
          <Typography variant="h6" component="div" >
          EventFusion
          </Typography>
        </Toolbar>
      </AppBar>
  )
}

export default Header