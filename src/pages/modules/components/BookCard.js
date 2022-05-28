import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { CardHeader, CardMedia, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as userApi from "../../../services/userApi";
import { auth } from "../../../services/firebaseService";

export default function BookCard({
  book,
  setMessage,
  setOpen,
  fetchData,
  isMovieBook,
}) {
  const navigate = useNavigate();

  const readBook = (id) => {
    navigate(`/read-book/${id}`);
  };

  const openImdb = (title) => {
    window.open(`https://www.imdb.com/find?q=${title}`);
  };

  const favouriteBook = async (id) => {
    if (auth.currentUser) {
      console.log(id);
      var added = await userApi.addRemoveFavourite(auth.currentUser.uid, id);
      setMessage(
        added ? "Book added to Read Later" : "Book removed from Read Later"
      );
      setOpen(true);
      if (fetchData) {
        await fetchData();
      }
    } else {
      setMessage("You must be logged in to add a book to Read Later");
      setOpen(true);
    }
  };

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <Box sx={{ maxWidth: 300 }}>
      <Card sx={{ minHeight: 500 }}>
        <CardHeader
          style={{ height: "150px" }}
          action={
            <IconButton
              aria-label="later"
              onClick={() => favouriteBook(book.BookId)}
            >
              <WatchLaterIcon />
            </IconButton>
          }
          title={
            <Typography variant="body1" color="text.secondary">
              {truncate(book.Title, 80)}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle2" color="text.secondary">
              {truncate(book.Authors, 80)}
            </Typography>
          }
        />
        <CardMedia
          style={{ objectFit: "contain" }}
          component="img"
          height="250"
          image={`https://www.gutenberg.org/cache/epub/${book["Text#"]}/pg${book["Text#"]}.cover.medium.jpg`}
          alt={book.Title}
        />
        <CardContent style={{ height: "70px" }}>
          <Typography variant="body2" color="text.secondary">
            {truncate(book.Bookshelves.toString(), 80)}
          </Typography>
        </CardContent>
        <CardActions>
          {!isMovieBook ? (
            <Button
              sx={{ width: "100%" }}
              onClick={() => readBook(book.BookId)}
              size="small"
              variant="contained"
            >
              Read
            </Button>
          ) : (
            <>
              <Button
                sx={{ width: "50%" }}
                onClick={() => readBook(book.BookId)}
                size="small"
                variant="outlined"
              >
                Read
              </Button>
              <Button
                sx={{ width: "50%" }}
                onClick={() => openImdb(book.Title)}
                size="small"
                variant="contained"
              >
                IMDB info
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}
