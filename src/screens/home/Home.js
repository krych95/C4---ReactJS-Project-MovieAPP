import React, { useEffect, useState } from "react";
import Header from '../../common/header/Header';
import './Home.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';





export default function Home(props) {

  const [movies, setmovies] = useState([]); 

  useEffect(()=>{

    const loadmovie = async (e) => {
      const response = await fetch(props.baseUrl+ 'movies?page=1&limit=20', {
           method: 'GET',
           headers: {
               "Accept": "application/json;charset=UTF-8",
               "Cache-Control": "no-cache",
           },
           });

           const  responseResult = await response.json();
          const getmovies = responseResult.movies;
          setmovies([...getmovies]);
 
 };
 loadmovie();
 
  }, []);



   let upcomingMovies = movies.filter(mv => mv.status === 'PUBLISHED')
   //let releasedMovies = movies.filter(mv => mv.status === 'RELEASED')

    return (
       <div className="upcomimgMovies">
         <Header baseUrl={props.baseUrl} buutonSingle='0' />
         <div className='headerBox'>Upcoming Movies</div>
         <div className=" upcomingmovie container">
         <GridList className="gridlist" cols={6}>
         {upcomingMovies.map(mv =>{
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
   
    )
  }
  