import * as React from "react";
import withRoot from "./modules/withRoot";
import { auth } from "../services/firebaseService";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Snackbar,
} from "@mui/material";
import Typography from "./modules/components/Typography";
import { useNavigate } from "react-router-dom";
import BookCard from "./modules/components/BookCard";
import * as userApi from "../services/userApi";
import * as bookApi from "../services/bookApi";
import CloseIcon from "@mui/icons-material/Close";
import BookLoad from "./modules/views/BookLoad";

function Index() {
  var navigate = useNavigate();

  React.useEffect(() => {
    if (auth.currentUser === null) {
      navigate("/");
    } else {
      fetchData();
    }
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
      var history = await userApi.getHistory(auth.currentUser.uid, 20);
      var books = await bookApi.getBookswithBookIds(history);
      console.log(books);
      setRecommendations(books);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Container component="section" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" marked="center" align="center" component="h3">
          History
        </Typography>
        {loading ? (
          <Box sx={{ mt: 6, display: "flex", flexWrap: "wrap" }}>
            <BookLoad />
          </Box>
        ) : recommendations.length === 0 ? (
          <Typography
            variant="h4"
            align="center"
            component="h3"
            sx={{ mt: 4, mb: 4 }}
          >
            No Books in History
          </Typography>
        ) : (
          <Box sx={{ mt: 6, display: "flex", flexWrap: "wrap" }}>
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
          </Box>
        )}
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
