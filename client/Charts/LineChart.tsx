import { ReactComponentElement } from "react";
import {Line} from "react-chartjs-2"
const LineChart = ({userData}) =>{
  return(
    <div className="h-60 w-60">
      <Line data={userData} height={1} width={2} />
    </div>
    
  )
} 
export default LineChart;