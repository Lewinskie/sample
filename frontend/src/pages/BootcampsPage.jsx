import {
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BootcampCard from "../components/BootcampCard";
import { useNavigate, useLocation } from "react-router-dom";

// STYLED COMPONENTS FUNCTIONS
const StyledContainer = styled(Container)({
  marginTop: 20,
});
const StyledLoader = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const StyledPaper = styled(Paper)({
  marginBottom: "1rem",
  padding: "13px",
});

const StyledFilters = styled("div")({
  padding: "0 1.5rem",
});

const StyledPriceRangeInputs = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const BootcampsPage = () => {
  const history = useNavigate();
  const location = useLocation();
  const params = location.search ? location.search : null;
  //COMPONENT STATE
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sliderMax, setSliderMax] = useState(1000);
  const [priceRange, setPriceRange] = useState([25, 75]);
  const [filter, setFilter] = useState("");

  console.log(bootcamps);

  //   SIDE EFFECTS
  useEffect(() => {
    let cancel;
    const fetchData = async () => {
      setLoading(true);
      try {
        let query;
        // console.log(location);
        if (params && !filter) {
          query = params;
        } else {
          query = filter;
        }

        const { data } = await axios({
          method: "GET",
          url: `http://localhost:3001/api/v1/bootcamps${query}`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setBootcamps(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => cancel();
  }, [filter, params]);
  const sliderCommitHandler = (e, newValue) => {
    buildRangeFilter(newValue);
  };

  const buildRangeFilter = (newValue) => {
    const urlFilter = `?price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`;

    setFilter(urlFilter);
    history(urlFilter);
  };

  return (
    <StyledContainer>
      {/* FILTERING AND SORTING SECTION  */}
      <StyledPaper>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Filters</Typography>
            <StyledFilters>
              <Slider
                min={0}
                max={sliderMax}
                value={priceRange}
                valueLabelDisplay="auto"
                onChange={(e, newValue) => setPriceRange(newValue)}
                onChangeCommitted={sliderCommitHandler}
              />

              <StyledPriceRangeInputs>
                <TextField
                  size="small"
                  id="lower"
                  label="Min Price"
                  variant="outlined"
                  type="number"
                  disabled={loading}
                  value={0}
                />

                <TextField
                  size="small"
                  id="upper"
                  label="Max Price"
                  variant="outlined"
                  type="number"
                  disabled={loading}
                  value={75}
                />
              </StyledPriceRangeInputs>
            </StyledFilters>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Sort by</Typography>
            <FormControl component="fieldset">
              <RadioGroup aria-label="Price-order" name="price-order">
                <FormControlLabel
                  disabled={loading}
                  control={<Radio />}
                  label="Price: Highest - Lowest"
                />
                <FormControlLabel
                  disabled={loading}
                  control={<Radio />}
                  label="Price: Lowest - Highest"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </StyledPaper>
      {/* BOOTCAMPS LISTING  */}
      <Grid container spacing={2}>
        {loading ? (
          <StyledLoader>
            <CircularProgress size="3rem" thickness={5} />
          </StyledLoader>
        ) : (
          bootcamps.map((bootcamp) => (
            <Grid item key={bootcamp._id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <BootcampCard bootcamp={bootcamp} />
            </Grid>
          ))
        )}
      </Grid>
    </StyledContainer>
  );
};

export default BootcampsPage;
