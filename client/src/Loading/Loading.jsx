import React from "react";
import loading from "../img/loading.gif";
import "./Loading.css"

export default function Loading(props){
  return(  
  <>
  <div >
      <div className="loading">
       <img  src={loading} alt="" />
       </div>
  </div>
  <div className="timeout">
  {
       setTimeout(()=>{
           props.setLoading(false)
        }, 2000)}
        </div>
  </>
  )
}