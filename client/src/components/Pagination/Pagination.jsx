import React, { useState } from "react";
import "./Pagination.css"

function Pagination({page, setPage, max}) {
    const[input, setInput] = useState(1)

    const nextPage = () => {
        if(input < max){
            setInput(input + 1)
            setPage(page + 1)
            }else{
            setInput(1)
            setPage(1)
            }
    }    
    const backPage = () =>{
        if(input > 1){
        setInput(input - 1)
        setPage(page - 1)
        }else{
        setInput(28)
        setPage(28)
        }
    }    

    const onKeyDown = (e) => {
        if(e.keyCode === 13){ // la tecla 13 es el enter
            setPage(parseInt(e.target.value))
            if(parseInt(e.target.value) < 1 || parseInt(e.target.value) > Math.ceil(max) || isNaN(parseInt(e.target.value))){
                setPage(1)
                setInput(1)
            }else{
                setPage(parseInt(e.target.value));
                setInput(parseInt(e.target.value));
            }
        }    
    }

    const onChange = (e) => {
        setInput(e.target.value)
    }

    return(
        <div className="pagination">
            <button className="previousPage" onClick={backPage}> 	&#11164;  </button>
            <input onChange={e => onChange(e)} onKeyDown={(e) => onKeyDown(e)} name="page" autoComplete="off" value={input} className="inputPage"  />
            <p>de {Math.ceil(max)}</p>
            <button className="nextPage" onClick={nextPage}>	&#11166;</button>

        </div>
    )
}


export default Pagination ;