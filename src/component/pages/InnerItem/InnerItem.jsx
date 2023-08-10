import React from 'react'

const InnerItem = ({data,array,index,changeData,setchangeData}) => {
  function click(index){
    setchangeData({...changeData,["img"]:array[index].img})
  }
  return (
    <div className='InnerPhoto'>
        <div><img
            src={data.img}
            alt="avatar"
            height="40"
            className='photo'
            onClick={()=>{
              click(index);
            }}
          /></div>
          <p>{data.Name}</p>
    </div>
  )
}

export default InnerItem