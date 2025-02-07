'use client'
import { alertContext } from '@/contexts/alerts/Alertstate'
import React, { useContext, useEffect, useState } from 'react'

const Alert = () => {

    const {alert} = useContext(alertContext)
   

    const captilaize = (word) => {
   
        return word[0].toUpperCase()+word.slice(1);
     }



    
  return (
    <>
    {alert && alert.type === "error" && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">{captilaize(alert.type)}! </strong>
  <span className="block sm:inline">{alert.msg}</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
  </span>
</div>}

{alert && alert.type === "success" && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">{captilaize(alert.type)}! </strong>
  <span className="block sm:inline">{alert.msg}</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
  </span>
</div>}
    </>
  )
}

export default Alert
