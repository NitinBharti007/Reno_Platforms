import Link from 'next/link';
import { Container, Typography, Card, CardContent, Button, Grid, Box, AppBar, Toolbar, IconButton, CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Home() {
  return (
    <>
      {/* Global Styles */}
      <CssBaseline />
      
      {/* AppBar (Header) */}
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            School Management System
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content Wrapper */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '95vh' }}>
        {/* Main Content */}
        <Container maxWidth="lg" sx={{ paddingTop: '100px', paddingBottom: '40px', flexGrow: 1 }}>
          {/* Welcome Section */}
          <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Welcome to the School Management System
          </Typography>

          <Typography variant="h6" paragraph align="center" sx={{ color: 'text.secondary', marginBottom: 4 }}>
            Manage your schools, view the list of schools, and add new schools to the platform with ease. Use the links below to navigate through the system.
          </Typography>

          {/* Grid for Navigation Cards */}
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={5} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                    Add a School
                  </Typography>
                  <Link href="/addSchool" passHref>
                    <Button variant="contained" color="primary" fullWidth sx={{ padding: '12px 0' }}>
                      Go to Add School
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={5} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                    Show Schools
                  </Typography>
                  <Link href="/showSchools" passHref>
                    <Button variant="contained" color="secondary" fullWidth sx={{ padding: '12px 0' }}>
                      Go to Schools List
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Footer Section */}
        <Box sx={{ backgroundColor: 'primary.main', color: 'white', padding: '20px 0' }}>
          <Typography variant="body1" align="center">
            © 2024 School Management System. All rights reserved.
          </Typography>
          <Typography variant="body2" align="center" sx={{ marginTop: 1 }}>
            Built with ❤️ by Nitin Bharti
          </Typography>
        </Box>
      </Box>
    </>
  );
}
