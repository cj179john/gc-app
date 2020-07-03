import React, { useEffect, useState } from 'react';
import './App.css';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  topBar: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: theme.spacing(10)
  },
  sideBar: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: theme.spacing(10),
    minHeight: 300
  },
  searchBar: {
    marginLeft: theme.spacing(2)
  },
  searchButton: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(1)
  }
}));

function App() {

  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios(`https://safe-sea-87885.herokuapp.com/api/posts?userId=${userId}`);
      setPosts(result.data);
    };
    fetchPosts();
  }, []);

  return (
   <div className={classes.root}>
     <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.topBar}>
            <TextField
              className={classes.searchBar}
              label={'User'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button className={classes.searchButton} variant="contained">Default</Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.sideBar}>
            <ul>
              {
                posts.map(post => (
                <li>{post.content}</li>
                ))
              }
            </ul>

          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.sideBar}></Paper>
        </Grid>
     </Grid>
   </div>
  );
}

export default App;
