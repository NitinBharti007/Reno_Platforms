"use client";

import { useState, useRef } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  School,
  LocationCity,
  LocalPhone,
  Email,
  CloudUpload,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function AddSchool() {
  const [schoolData, setSchoolData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    image: null,
    email_id: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef(null);

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

    if (!schoolData.image) {
      setErrorMessage("Please upload a valid image.");
      setErrorSnackbar(true);
      return;
    }

    const formData = new FormData();
    for (let key in schoolData) {
      formData.append(key, schoolData[key]);
    }

    setLoading(true);

    try {
      await axios.post("https://reno-platforms-kxm6.vercel.app/api/addSchool", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOpenSnackbar(true);
      setSchoolData({
        name: "",
        address: "",
        city: "",
        state: "",
        contact: "",
        image: null,
        email_id: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setError("Error adding school");
      console.error("Error adding school:", error);
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleGoToSchoolList = () => {
    router.push("/showSchools");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <Typography variant="h4">School Management System</Typography>
        <Typography variant="h6">Add a New School</Typography>
      </Box>

      {/* Main Content Wrapper */}
      <Container
        maxWidth="sm"
        sx={{
          marginTop: "20px",
          paddingTop: "40px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          flexGrow: 1,
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="School Name"
            fullWidth
            variant="outlined"
            margin="normal"
            name="name"
            value={schoolData.name}
            onChange={handleChange}
            required
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <School />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Address"
            fullWidth
            variant="outlined"
            margin="normal"
            name="address"
            value={schoolData.address}
            onChange={handleChange}
            required
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCity />
                </InputAdornment>
              ),
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="City"
                fullWidth
                variant="outlined"
                margin="normal"
                name="city"
                value={schoolData.city}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "5px",
                  marginBottom: "20px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                fullWidth
                variant="outlined"
                margin="normal"
                name="state"
                value={schoolData.state}
                onChange={handleChange}
                required
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "5px",
                  marginBottom: "20px",
                }}
              />
            </Grid>
          </Grid>
          <TextField
            label="Contact Number"
            fullWidth
            variant="outlined"
            margin="normal"
            name="contact"
            value={schoolData.contact}
            onChange={handleChange}
            required
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhone />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            name="email_id"
            value={schoolData.email_id}
            onChange={handleChange}
            required
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <Box mt={2}>
            <label
              htmlFor="file-upload"
              style={{ display: "block", marginBottom: "10px" }}
            >
              <Typography variant="subtitle1">Upload School Logo</Typography>
            </label>
            <input
              id="file-upload"
              type="file"
              name="image"
              onChange={handleFileChange}
              ref={fileInputRef}
              required
              style={{
                display: "block",
                marginTop: "10px",
                padding: "8px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                width: "100%",
                border: "2px solid #ddd",
                boxSizing: "border-box",
              }}
            />
          </Box>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                padding: "12px 16px",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              {loading ? (
                "Adding School..."
              ) : (
                <>
                  <CloudUpload sx={{ mr: 1 }} /> Add School
                </>
              )}
            </Button>
          </Box>
        </form>

        {/* Success Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            School added successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={errorSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>

        {/* Go to School List Button */}
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGoToSchoolList}
            sx={{ width: "100%" }}
          >
            Go to School List
          </Button>
        </Box>
      </Container>

      {/* Footer Section */}
      <Box
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <Typography variant="body1">
          © 2024 School Management System. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          Built with ❤️ by Nitin Bharti
        </Typography>
      </Box>
    </Box>
  );
}
