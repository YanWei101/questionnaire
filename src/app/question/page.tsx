'use client'
import React, { useEffect } from 'react'
import {getQuestion} from '@/services/question'
export default function Page() {
  useEffect(()=>{
    async function fetchData(){
      const res = await getQuestion('123')
      console.log(res)
    }
    fetchData()
  },[]) 
  return (
    <div>question page</div>
  )
}
