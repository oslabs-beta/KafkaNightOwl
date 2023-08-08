import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import AlertCard from './AlertCard';

export default function NotificationsContainer() {
  const [namespace, setNamespace] = React.useState('');

  const handleChange = (event) => {
    setNamespace(event.target.value);
  };

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {

    fetch('http://localhost:9090/api/v1/alerts')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.data.alerts.length !== 0) {
          setNotifications((prev) => ([data]));
        }
      })
  },[])

  return (
  <>
   <Grid container spacing={2}>
      <Grid item xs={2}>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Sort By</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={namespace}
                label='sortBy'
                onChange={handleChange}
              >
                <MenuItem value={10}>Alert Name</MenuItem>
                <MenuItem value={20}>Namespace</MenuItem>
                <MenuItem value={30}>Severity</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
          </Box>
      </Grid> 
   </Grid>
  
   <Grid container spacing={1}>
        {notifications.map((notification) => (

            <Grid item direction= 'row' xs={12}>
              <AlertCard
                alertname={notification.data.alerts[0].labels.alertname}
                description={notification.data.alerts[0].annotations.description}
                title={notification.data.alerts[0].annotations.title}
                service={notification.data.alerts[0].labels.job}
                severity={notification.data.alerts[0].labels.severity}
                state={notification.data.alerts[0].state}
                activeAt={notification.data.alerts[0].activeAt}
                value={notification.data.alerts[0].value}
                instance={notification.data.alerts[0].labels.instance}
              />
            </Grid>
          ))}
    </Grid>
  </>
  );
}