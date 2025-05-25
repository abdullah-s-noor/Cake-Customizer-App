import React from 'react'
import axios from 'axios'
import {useState} from 'react'
function test() {
    const [shape,setShape]=useState('');
    const [flavor,setFlavor]=useState('');
    const handleApi =async()=>{
        try{
            const {data} = await axios.get('/data/data.json');
            console.log(data.shapes[0].flavors[0].image.secure_url);
            setShape(data.shapes[0].image.secure_url);
            setFlavor(data.shapes[0].flavors[0].image.secure_url)

        }catch(err){
            console.log(err)
        }finally{
            console.log('finally')
        }
    }
  return (
    <div>
      <h1>Test Component</h1>
      <button onClick={handleApi}>Fetch Data</button>
      {
        shape && <img src={shape} alt="Shape" style={{width: '200px', height: '200px'}} />
      }
      {
        flavor && <img src={flavor} alt="Flavor" style={{width: '200px', height: '200px'}} />
      }
    </div>
  )
}

export default test