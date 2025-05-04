import React from 'react'
import Status from "./Status"
import axios from "axios";

const page = async() => {
    let statusData = null;

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/status`);
      statusData = res.data[0];
    } catch (error) {
      statusData = null;
      console.error("Error fetching status data:", error);
    }
  return (
<Status result={statusData}/>  )
}

export default page