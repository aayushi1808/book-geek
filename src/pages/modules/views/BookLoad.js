import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
  CardHeader,
} from "@mui/material";
import * as React from "react";

function SkeletonCard() {
  return (
    <Box sx={{ maxWidth: 300 }}>
      <Card sx={{ minHeight: 500 }}>
        <CardHeader
          style={{ height: "150px" }}
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        <CardContent style={{ height: "70px" }}>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" />
        </CardContent>
      </Card>
    </Box>
  );
}

function BookLoad() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} sm={3} md={3} key={0}>
        {SkeletonCard()}
      </Grid>
      <Grid item xs={6} sm={3} md={3} key={1}>
        {SkeletonCard()}
      </Grid>
      <Grid item xs={6} sm={3} md={3} key={2}>
        {SkeletonCard()}
      </Grid>
      <Grid item xs={6} sm={3} md={3} key={3}>
        {SkeletonCard()}
      </Grid>
    </Grid>
  );
}

export default BookLoad;
