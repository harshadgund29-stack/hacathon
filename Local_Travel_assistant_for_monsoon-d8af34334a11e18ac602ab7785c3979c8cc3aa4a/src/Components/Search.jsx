import React, { use, useEffect } from 'react'
import './Search.css'
import { useNavigate } from 'react-router-dom'
const Search = () => {

const currnet_loc = JSON.parse(localStorage.getItem("current_location")) || null
const nav = useNavigate()
// console.log(currnet_loc);
const [c_loc,setC_loc] = React.useState("")
const [dest,set_Dest] = React.useState("")
// console.log(currnet_loc[0]);
useEffect(() => {

   const res = async () => {
     if (currnet_loc) {
       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${(currnet_loc[0])}&lon=${(currnet_loc[1])}&format=json`);
       const data = await response.json();
       setC_loc(data.display_name)
    //    console.log(data);
       
    //    console.log(data);
     }
   }
   res()
},[])



const routes = (e) =>{
    e.preventDefault()
    if(c_loc === dest){
        alert("Source and Destination can't be same")
        return
    }
    // nav(`/routes?from=${from}&to=${to}`)
    console.log(c_loc, dest);
    nav(`/routess?from=${c_loc}&to=${dest}`)
    


}







  return (
    <div>
      <div className="container-fluid  pt-5 pb-3" style={{backgroundColor:"#4e494977",backdropFilter:"blur(5px)",borderRadius:"10px",boxShadow:"1px 1px 3px gray"}}>

        <div className="row">
            <div className="col-md-10 mx-auto">
                <div className="row">
                    <form onSubmit={routes}>

                        <div className='d-flex gap-2 text-light inp'>
                            <input style={{color:"white"}} defaultValue={c_loc} className='form-control' type="search" name="" id="" placeholder='📍  from'  required/>
                            <input style={{color:"white"}} value={dest} onChange={(e)=>set_Dest(e.target.value)} className='form-control' type="search" name="" id="" placeholder='➡️  to' required/>

                        </div>
                        <div className='d-flex justify-content-center mt-3'>
                            <button className='btn btn-primary' type='submit'>
                            Find Safe Routes
                        </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Search
