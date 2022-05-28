import * as React from "react";
import withRoot from "./modules/withRoot";
import { auth } from "../services/firebaseService";
import { Box, Container, Grid, IconButton, Snackbar } from "@mui/material";
import Typography from "./modules/components/Typography";
import BookCard from "./modules/components/BookCard";
import * as userApi from "../services/userApi";
import * as recommendationApi from "../services/recommendationApi";
import CloseIcon from "@mui/icons-material/Close";
import BookLoad from "./modules/views/BookLoad";

function Index() {
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      fetchData();
    });
  }, []);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const [recommendations, setRecommendations] = React.useState([]);

  const fetchData = async () => {
    var books = [];
    if (auth.currentUser) {
      var userDoc = await userApi.getUser(auth.currentUser.uid);
      const userData = userDoc.data();
      console.log(userData);
      if (userData.genres) {
        books = await recommendationApi.getBookPredictionWithGenre(
          userData.genres
        );
      }
      books = [
        ...(await recommendationApi.getBookPredictionWithHistory(userData.uid)),
        ...books,
      ];
    } else {
      var genres = ["Adventure", "Science Fiction", "Politics"];
      books = await recommendationApi.getBookPredictionWithGenre(genres);
    }
    console.log(books);
    setRecommendations(books);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Container component="section" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" marked="center" align="center" component="h3">
          {auth.currentUser ? "Recommended for you" : "Popular Books"}
        </Typography>
        <Box sx={{ mt: 6, display: "flex", flexWrap: "wrap" }}>
          {loading ? (
            <BookLoad />
          ) : (
            <Grid container spacing={3}>
              {recommendations.map((book, id) => (
                <Grid item xs={6} sm={3} md={3} key={id}>
                  <BookCard
                    book={book}
                    setMessage={setMessage}
                    setOpen={setOpen}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
      <Snackbar
        autoHideDuration={3000}
        open={open}
        onClose={handleClose}
        message={message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </React.Fragment>
  );
}

export default withRoot(Index);
