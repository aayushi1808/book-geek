import * as React from "react";
import Typography from "./modules/components/Typography";
import AppForm from "./modules/views/AppForm";
import withRoot from "./modules/withRoot";
import { useParams } from "react-router-dom";
import * as bookApi from "../services/bookApi";
import * as userApi from "../services/userApi";
import { Box, Button, Divider, Grid, Skeleton, Stack } from "@mui/material";
import { auth } from "../services/firebaseService";

function ReadBook() {
  var { id } = useParams();
  var [book, setBook] = React.useState(null);
  var [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    bookApi.getBookWithBookId(id).then(async (bookDoc) => {
      if (bookDoc.exists()) {
        var book = bookDoc.data();
        setBook(book);
        if (auth.currentUser) {
          await userApi.addBookRead(auth.currentUser.uid, book.BookId);
        }
      } else {
        console.log("Book not found");
      }
      setLoading(false);
    });
  }, [auth.currentUser]);

  const openGutenberg = (bid) => {
    window.open(`https://www.gutenberg.org/ebooks/${bid}`);
  };

  return (
    <React.Fragment>
      {loading ? (
        <AppForm>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Divider />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={500}
          />
        </AppForm>
      ) : book ? (
        <AppForm>
          <Typography variant="h6" gutterBottom>
            {book.Title}
          </Typography>
          <Stack direction="row" mb={1}>
            <Typography variant="body" gutterBottom>
              by {book.Authors}
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Button
              variant="contained"
              style={{ color: "white" }}
              onClick={() => openGutenberg(book["Text#"])}
            >
              Open Book on Gutenberg
            </Button>
          </Stack>
          <Divider />
          <iframe
            width="100%"
            height="500"
            title={book.Title}
            src={`https://www.gutenberg.org/ebooks/${book["Text#"]}`}
          />
        </AppForm>
      ) : (
        <AppForm>
          <Typography
            variant="h3"
            marked="center"
            align="center"
            component="h4"
          >
            Not Book Found
          </Typography>
        </AppForm>
      )}
    </React.Fragment>
  );
}

export default withRoot(ReadBook);
