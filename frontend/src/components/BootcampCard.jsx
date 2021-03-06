import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
// import styled from "@emotion/styled";

// const StyledCard = styled(Card)({});
//FORMAT CURRENCY
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "KSH",
  maximumFractionDigits: 2,
});

const BootcampCard = ({ bootcamp }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={<Typography variant="h6">{bootcamp.name}</Typography>}
      />

      <CardContent>
        <Typography variant="caption">{bootcamp.description}</Typography>
        <Typography variant="h6">{formatter.format(bootcamp.price)}</Typography>
        <Rating
          value={bootcamp.rating}
          readOnly
          name={bootcamp.name}
          size="small"
          precision={0.5}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" color="primary">
          Book Now
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default BootcampCard;
