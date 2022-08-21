import React from 'react';
import Header from '../../common/header/Header';


export default function Home(props) {
    return (
       <div>
         <Header baseUrl={props.baseUrl} />
       </div>
    )
  }
  