import * as React from "react";
import Typography from "./modules/components/Typography";
import AppForm from "./modules/views/AppForm";
import withRoot from "./modules/withRoot";
import { auth } from "../services/firebaseService";
import { useNavigate } from "react-router-dom";
import genre from "../services/data/genre.json";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Box,
  IconButton,
  Snackbar,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import InterestsIcon from "@mui/icons-material/Interests";
import CloseIcon from "@mui/icons-material/Close";
import * as userApi from "../services/userApi";
import CircularProgress from "@mui/material/CircularProgress";

function Profile() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (auth.currentUser === null) {
      navigate("/");
    } else {
      userApi.getUser(auth.currentUser.uid).then((userDoc) => {
        if (userDoc.exists()) {
          var user = userDoc.data();
          if (user.genres) {
            setState([...user.genres]);
          }
          setLoading(false);
        }
      });
    }
  }, []);

  const [state, setState] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleChange = (event) => {
    if (event.target.checked) {
      setState([...state, event.target.name]);
    } else {
      setState([...state.filter((item) => item !== event.target.name)]);
    }
  };
  const error = state.length < 3;

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (error) {
      setMessage("Please select at least 3 genres");
      setOpen(true);
      return;
    }
    await userApi.updateUser(auth.currentUser.uid, {
      genres: state,
    });
    setLoading(false);
    setMessage("Added genres to your profile");
    setOpen(true);
    // navigate("/");
  };

  return (
    <React.Fragment>
      <AppForm>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Profile
        </Typography>
        <FormControl
          required
          error={error}
          component="fieldset"
          variant="standard"
        >
          <Grid container spacing={1}>
            <Grid item>
              <FormLabel component="legend">
                Select your favourite Genres
              </FormLabel>
            </Grid>
            {error ? (
              <Grid item>
                <FormHelperText>Select Atleast 3</FormHelperText>
              </Grid>
            ) : null}
            <Box sx={{ flex: 1 }} />
            <Grid>
              <Button
                onClick={handleSubmit}
                size="medium"
                variant="contained"
                style={{ color: "white", width: "100px" }}
              >
                {loading ? (
                  <CircularProgress
                    size={25}
                    style={{ paddingRight: "5px", color: "#fff5f8" }}
                  />
                ) : (
                  <>
                    <InterestsIcon style={{ paddingRight: "5px" }} /> Save
                  </>
                )}
              </Button>
            </Grid>
          </Grid>
          <FormGroup>
            <Grid container spacing={1}>
              {genre.genre.map((item, id) => (
                <Grid item xs={6} sm={3} md={3}>
                  <FormControlLabel
                    key={id}
                    control={
                      <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={state.includes(item)}
                        onChange={handleChange}
                        name={item}
                        disabled={loading}
                      />
                    }
                    label={item}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        </FormControl>
      </AppForm>
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

export default withRoot(Profile);
