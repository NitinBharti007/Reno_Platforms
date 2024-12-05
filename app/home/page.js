'use client';

import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Grid, Box, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '50px',
    minHeight: '100vh',
    backgroundImage: 'url("/public/1.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(5px)',
  },
  card: {
    padding: theme.spacing(4),
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '100%',
    maxWidth: '600px',
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  uploadButton: {
    marginTop: theme.spacing(2),
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    textAlign: 'center',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

export default function AddSchool() {
  const classes = useStyles();
  const [schoolData, setSchoolData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    contact: '',
    image: null,
    email_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchoolData({
      ...schoolData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSchoolData({
      ...schoolData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in schoolData) {
      formData.append(key, schoolData[key]);
    }

    try {
      await axios.post('http://localhost:5000/api/addSchool', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('School added successfully');
      setSchoolData({
        name: '',
        address: '',
        city: '',
        state: '',
        contact: '',
        image: null,
        email_id: '',
      });
    } catch (error) {
      console.error('Error adding school:', error);
      alert('Error adding school');
    }
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Typography variant="h4" className={classes.title}>
          Add a New School
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="School Name"
            fullWidth
            variant="outlined"
            name="name"
            value={schoolData.name}
            onChange={handleChange}
            className={classes.input}
            required
          />
          <TextField
            label="Address"
            fullWidth
            variant="outlined"
            name="address"
            value={schoolData.address}
            onChange={handleChange}
            className={classes.input}
            required
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="City"
                fullWidth
                variant="outlined"
                name="city"
                value={schoolData.city}
                onChange={handleChange}
                required
                className={classes.input}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                fullWidth
                variant="outlined"
                name="state"
                value={schoolData.state}
                onChange={handleChange}
                required
                className={classes.input}
              />
            </Grid>
          </Grid>
          <TextField
            label="Contact"
            fullWidth
            variant="outlined"
            name="contact"
            value={schoolData.contact}
            onChange={handleChange}
            className={classes.input}
            required
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            name="email_id"
            value={schoolData.email_id}
            onChange={handleChange}
            className={classes.input}
            required
          />
          <Box mt={2}>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required
              className={classes.uploadButton}
            />
          </Box>
          <Box mt={3}>
            <Button variant="contained" color="primary" type="submit" fullWidth className={classes.button}>
              Add School
            </Button>
          </Box>
        </form>
      </Card>
    </div>
  );
}