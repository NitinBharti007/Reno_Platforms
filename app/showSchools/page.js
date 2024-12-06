'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Box, AppBar, Toolbar, Button } from '@mui/material';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        // Use the environment variable for the backend URL
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        const response = await axios.get(`${backendUrl}/getSchools`);
        setSchools(response.data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchools();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Header Section */}
      <AppBar position="sticky" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            School Directory
          </Typography>
          <Button color="inherit" href="/">Home</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ paddingTop: '50px', flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#3f51b5' }}>
          Schools List
        </Typography>

        {schools.length > 0 ? (
          <Grid container spacing={3}>
            {schools.map((school) => (
              <Grid item xs={12} sm={6} md={4} key={school.id}>
                <Card sx={{
                  borderRadius: '8px', 
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                  '&:hover': { boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' },
                  transition: 'box-shadow 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  <CardMedia
                    component="img"
                    alt={school.name}
                    image={`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/public/schoolImages/${school.image}`}
                    sx={{
                      objectFit: 'cover',
                      height: '200px',
                      borderRadius: '8px 8px 0 0'
                    }}
                  />
                  <CardContent sx={{ padding: '16px', flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                      {school.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '8px' }}>
                      {school.address}, {school.city}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center', color: 'gray' }}>
            No schools found.
          </Typography>
        )}
      </Container>      
    </Box>
  );
}
