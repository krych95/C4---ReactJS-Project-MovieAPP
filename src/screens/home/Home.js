import React, { useEffect, useState } from "react";
import Header from '../../common/header/Header';
import './Home.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function Home(props) {
// Api States
  const [upcomingmovies, setupcomingmovies] = useState([]); 
  const [releasedmovies, setreleasedmovies] = useState([]); 
  const [moviesArtists, setmoviesArtists] = useState([]); 
  const [moviesGenres, setmoviesGenres] = useState([]); 


// Filter Sates

const [movieTitle, setmovieTitle] = useState('initiated');
const [movieGenres, setmovieGenres] = useState('initiated');
const [movieArtists, setmovieArtists] = useState('initiated');
const [todate, settodate] = useState('initiated');
const [formDate, setformDate] = useState('initiated');


  useEffect(()=>{

    const loaupdmovie = async (e) => {
      const response = await fetch(props.baseUrl+ 'movies?page=1&limit=20&status=PUBLISHED', {
           method: 'GET',
           headers: {
               "Accept": "application/json;charset=UTF-8",
               "Cache-Control": "no-cache",
           },
           });

          const  responseResult = await response.json();
          const getupmovies = responseResult.movies;
          setupcomingmovies([...getupmovies]);
 };
 loaupdmovie();
 
  }, []);

  useEffect(()=>{

    const loadmovie = async (e) => {
      const response = await fetch(props.baseUrl+ 'movies?page=1&limit=20&status=RELEASED', {
           method: 'GET',
           headers: {
               "Accept": "application/json;charset=UTF-8",
               "Cache-Control": "no-cache",
           },
           });

          const  responseResult = await response.json();
          const getresmovies = responseResult.movies;
          setreleasedmovies([...getresmovies]);
 
 };
 loadmovie();
 
  }, []);

  useEffect(()=>{

    const loadmoviesArtists = async (e) => {
      const response = await fetch(props.baseUrl+ 'artists', {
           method: 'GET',
           headers: {
               "Accept": "application/json;charset=UTF-8",
               "Cache-Control": "no-cache",
           },
           });

          const  responseResult = await response.json();
          const getartists = responseResult.artists;
          setmoviesArtists([...getartists]);
 
 };
 loadmoviesArtists();
 
  }, []);

  useEffect(()=>{

    const loadmoviesGenres = async (e) => {
      const response = await fetch(props.baseUrl+ 'genres', {
           method: 'GET',
           headers: {
               "Accept": "application/json;charset=UTF-8",
               "Cache-Control": "no-cache",
           },
           });

          const  responseResult = await response.json();
          const getgenres = responseResult.genres;
          setmoviesGenres([...getgenres]); 
 };
 loadmoviesGenres();

  }, []);

  function formatDate (input) {
    var datePart = input.match(/\d+/g),
    year = datePart[0],
    month = datePart[1], day = datePart[2];
  
    return day+'-'+month+'-'+year;
  }

     // filter aCtion
     const movieTitleHandaler = (e) =>{
      setmovieTitle(e.target.value);
    }
    const movieGenreHandaler = (e) =>{
      setmovieGenres(e.target.value);
    }
    const movieArtistsHandaler = (e) =>{
      setmovieArtists(e.target.value);
    }
    const todateHandaler = (e) =>{
      let gettodate = e.target.value;
      // const date = gettodate;
      // const [day, month, year] = date.split('/');
      // const result = [year, month, day].join('/');
      settodate(gettodate);
    }

    const formdateHandaler = (e) =>{
      let getformdate = e.target.value;
      setformDate(getformdate);
    }

     // submit button
     const findshow = () =>{
      if(movieTitle !== 'initiated' && movieGenres !== 'initiated' && movieArtists !== 'initiated' && todate !== 'initiated'  && formDate !== 'initiated' ){
     const filterdata = releasedmovies.filter(
           rm => rm.title === movieTitle &&
           rm.genres.includes(movieGenres) &&
           rm.artists.some(art => art.id === movieArtists) === true &&
           formatDate(rm.release_date) >= todate && formatDate(rm.release_date) <= formDate 
      );
      setreleasedmovies(filterdata);
     }
     else if(movieTitle !== 'initiated' && movieGenres !== 'initiated' && movieArtists !== 'initiated' && todate !== 'initiated'){
      const filterdata = releasedmovies.filter(
            rm => rm.title === movieTitle &&
            rm.genres.includes(movieGenres) &&
            rm.artists.some(art => art.id === movieArtists) === true &&
            formatDate(rm.release_date) >= todate
       );
       setreleasedmovies(filterdata);
      }
      else if(movieTitle !== 'initiated' && movieGenres !== 'initiated' && movieArtists !== 'initiated'){
        const filterdata = releasedmovies.filter(
              rm => rm.title === movieTitle &&
              rm.genres.includes(movieGenres) &&
              rm.artists.some(art => art.id === movieArtists) === true 
    
         );
         setreleasedmovies(filterdata);
        }
        else if(movieTitle !== 'initiated' && movieGenres !== 'initiated'){
          const filterdata = releasedmovies.filter(
                rm => rm.title === movieTitle &&
                rm.genres.includes(movieGenres) 
           );
           setreleasedmovies(filterdata);
          }
          else if(movieTitle !== 'initiated'){
            const filterdata = releasedmovies.filter(
                  rm => rm.title === movieTitle);
             setreleasedmovies(filterdata);
            }

            else if(movieGenres !== 'initiated' ){
              const filterdata =  releasedmovies.filter( rm => rm.genres.includes(movieGenres));
               setreleasedmovies(filterdata);
              }

              else  if( movieArtists !== 'initiated' ){
                const filterdata = releasedmovies.filter( rm => 
              
                rm.artists.some(art => art.id === movieArtists) === true 
                 );
                 setreleasedmovies(filterdata);
                }

                else if( todate !== 'initiated' ){
                  const filterdata = releasedmovies.filter(
                 
                    rm =>   formatDate(rm.release_date) >= todate 
                   );
                   setreleasedmovies(filterdata);
                  }

              
                    else if(formDate !== 'initiated' ){
                      const filterdata = releasedmovies.filter(
                        rm => formatDate(rm.release_date) <= formDate 
                       );
                       setreleasedmovies(filterdata);
                      }
         
     }

    return (
      <div>
         <Header baseUrl={props.baseUrl} buutonSingle={1} movieid=""/>
         <div className="upcomimgMovies">
         <div className='headerBox'>Upcoming Movies</div>
         <div className=" upcomingmovie container">
          {/* {  releasedmovies.artists.map(rg => {
            return rg.first_name;
          })} */}
         <GridList cellHeight={250} className="gridlist" cols={6}>
         {upcomingmovies.map(mv =>{
            return<GridListTile key={mv.id}>
           <img src={mv.poster_url} alt={mv.title} /> 
           <GridListTileBar
              title={mv.title}
              className="title_bar"
            />
           </GridListTile>
         })}
         </GridList>  
         </div> 
       </div>
       <div className="releasedMovies">
        <div className="containerMain">
          <div className="move_list">
          <GridList cellHeight={350} className="gridlist" cols={4}>
         {releasedmovies.map(mv =>{
            return<Link key={mv.id} to={"/movie/"+mv.id}>
            <GridListTile >
           <img src={mv.poster_url} alt={mv.title} /> 
           <GridListTileBar
              title={mv.title}
              className="title_bar"
              subtitle={<Typography color="inherit">
                Release Date:{formatDate(mv.release_date)}
              </Typography>}
            />
           </GridListTile>
           </Link>
         })}
         </GridList>  
          </div>
          <div className="movie_form">
          <Card className="cardStyle">
          <CardContent>
            <Typography variant="headline" component="h2">
            FIND MOVIES BY:
            </Typography>
            <br />
     <FormControl  className="formControl">
              <InputLabel htmlFor="tickets">
              Movie Name 
              </InputLabel>
              <Input
                id="movieTitle"
                value={movieTitle}
                onChange={movieTitleHandaler}
              />
            </FormControl> 
            <br /> 
            <br />
            <FormControl  className="formControl">
              <InputLabel htmlFor="theatre">Genres</InputLabel>
              <Select  value={movieGenres} onChange={movieGenreHandaler}>
                {moviesGenres.map((gn) => (
                  <MenuItem  key={"gene" + gn.id}  value={gn.genre}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                            />
                          }
                          label={gn.genre}
                        />
                  </MenuItem >
                ))}
              </Select>
            </FormControl>
            <br />
            <br />
            <FormControl  className="formControl">
              <InputLabel htmlFor="language">Artists</InputLabel>
              <Select value={movieArtists} onChange={movieArtistsHandaler}>
                {moviesArtists.map((ma) => (
                  <MenuItem   key={"artists" + ma.id} value={ma.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        />
                    }
                    label= {`${ma.first_name} ${ma.last_name} `}
                  />
                 </MenuItem >
                  ))}
              </Select>
            </FormControl>
            <br />
            <br />
            <FormControl  className="formControl">
              <InputLabel htmlFor="showDate">Release Date Start</InputLabel>
              <Input
                id="releasetodate"
                value={todate}
                onChange={todateHandaler}
              />
            </FormControl>
            <br />
            <br />
            <FormControl  className="formControl">
              <InputLabel htmlFor="showDate">Release Date Start</InputLabel>
              <Input
                id="releaseformdate"
                value={formDate}
              onChange={formdateHandaler}
              />
            </FormControl>
            <br />
            <br />
            <Button
              variant="contained"
              onClick={findshow}
              color="primary"
              className="filter_button"
            >
              APPLY
            </Button>
          </CardContent>
        </Card>
          </div>
        </div>
       </div>



       </div>
   
    )
  }
  