import React from 'react'

const InnerItem = ({data}) => {
  return (
    <div className='InnerPhoto'>
        <div><img
            src={data.img}
            alt="avatar"
            height="40"
            className='photo'
          /></div>
          <p>{data.Name}</p>
    </div>
  )
}

export default InnerItem