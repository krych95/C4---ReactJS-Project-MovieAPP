import React, { useEffect, useState } from "react";
import './Details.css'
import Header from '../../common/header/Header';
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
export default function Details(props) {
const {id}  = props.match.params

const [movieDetails, setmovieDetails] = useState({});
const [ratings, setratings] = useState(null);




useEffect(()=>{

   const loadmoviedetails = async (e) => {
     const response = await fetch(props.baseUrl+ 'movies/'+id, {
          method: 'GET',
          headers: {
              "Accept": "application/json;charset=UTF-8",
              "Cache-Control": "no-cache",
          },
          });

         const  responseResult = await response.json();
         // const getmovieDetails = responseResult.movies;
         setmovieDetails(responseResult);
};
loadmoviedetails();

 }, []);

//console.log(movieDetails);


const relasedate = new Date(movieDetails.release_date);
let movieGense = [];
 if(movieDetails.genres !== undefined){
   movieGense =  movieDetails.genres.join(", ");
}

let movieArtists = [];
 if(movieDetails.artists !== undefined){
  movieArtists =  movieDetails.artists;
}
const opts = {
   height: '380px',
   width: '100%',
   playerVars: {
     // https://developers.google.com/youtube/player_parameters
     autoplay: 0,
   },
 };

 var videoid = "";
if(movieDetails.trailer_url !== undefined){
 var url_string = movieDetails.trailer_url; 
 var  url = new URL(url_string);
  videoid = url.searchParams.get("v");
}


const _onReady = (e) => {
   e.target.pauseVideo();
 }
 const ratingHandaler =(e) =>{
  setratings(e.target.value);
 }


    return (
       <div>
           <Header baseUrl={props.baseUrl} buutonSingle={0} movieid={id} />
           <Typography className="backtohome">
          <Link to={"/"}>
            &#60; Back to Home
          </Link>
        </Typography>
        <div className="movieDetails">
         <div className="container">
            <div className="movie_poster">
              <img src={movieDetails.poster_url} alt={movieDetails.title} height="auto" width="90%"/>
            </div>
            <div className="movie_details">
            <Typography component="h2" variant="headline">
            {movieDetails.title}
           </Typography>
           <div className="text-inline">
           <Typography variant="body2" className="info">
           Genres: 
           </Typography>
           <Typography variant="body1" >
           {movieGense}
          </Typography>
          </div>
          <div className="text-inline">
           <Typography variant="body2" className="info">
           Duration: 
           </Typography>
           <Typography variant="body1" >
           {movieDetails.duration}
          </Typography>
          </div>
          <div className="text-inline">
           <Typography variant="body2" className="info">
           Relase Date: 
           </Typography>
           <Typography variant="body1" >
           {relasedate.toDateString()}
          </Typography>
          </div>
          <div className="text-inline">
           <Typography variant="body2" className="info">
           Rating: 
           </Typography>
           <Typography variant="body1" >
           {movieDetails.rating}
          </Typography>
          </div>
          <div className="text-inline plot">
           <Typography variant="body2" className="info">
           Plot: 
           </Typography>
           <Typography variant="body1" >
            <a href={movieDetails.wiki_url}>(wiki_Link) </a>
           {movieDetails.storyline}
          </Typography>
          </div>
          <div className="trailer">
           <Typography variant="body2" className="info">
           Trailer:
           </Typography>
     <YouTube videoId={videoid} opts={opts} onReady={_onReady} />
          </div>
            </div>
            <div className="ratings_artists">
            <Typography variant="body2" className="info">
            Rate this movie:
           </Typography>
            {[...Array(5)].map((star, i)=> {
              const ratingsval = i+1;
              return <label key={ratingsval}>
              <input type="radio" name="ratings" className="star_radio" value={ratingsval} onClick={ratingHandaler} />
              <StarBorderIcon  style={ratingsval <= ratings ? { color: "#fff100" }:{ color: "#151515" } }/>
            </label>
            })}
             <div className="artists">
             <Typography variant="body2" className="info">
             Artists:
           </Typography>

           <GridList cellHeight={250} className="gridlist" cols={2}>
          {movieArtists.map(ma =>{
            return <GridListTile key={ma.id}>
           <img src={ma.profile_url} alt={ma.first_name} /> 
           <GridListTileBar
              title={`${ma.first_name} ${ma.last_name}`} 
              className="title_bar"
            />
           </GridListTile>
         })}
         </GridList>  
             </div>
     
         
    
            </div>
         </div>
        </div>
       </div>
    )
  }
  