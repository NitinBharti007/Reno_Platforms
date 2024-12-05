'use client';

import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Grid, Box, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled('div')(({ theme }) => ({
  paddingTop: '50px',
  minHeight: '100vh',
  backgroundImage: 'url("/1.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'blur(5px)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  width: '100%',
  maxWidth: '600px',
}));

export default function AddSchool() {
  const [schoolData, setSchoolData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    contact: '',
    image: null,
    email_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchoolData({
      ...schoolData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5000000) { // Limit file size to 5MB
      setSchoolData({
        ...schoolData,
        image: file,
      });
    } else {
      alert('Please upload a file smaller than 5MB');
    }
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
    <StyledContainer>
      <StyledCard>
        <Typography variant="h4" align="center" gutterBottom>
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
            margin="normal"
            required
          />
          <TextField
            label="Address"
            fullWidth
            variant="outlined"
            name="address"
            value={schoolData.address}
            onChange={handleChange}
            margin="normal"
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
                margin="normal"
                required
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
                margin="normal"
                required
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
            margin="normal"
            required
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            name="email_id"
            value={schoolData.email_id}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box mt={2}>
            <Button
              variant="contained"
              component="label"
              fullWidth
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Box>
          <Box mt={3}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add School
            </Button>
          </Box>
        </form>
      </StyledCard>
    </StyledContainer>
  );
}
