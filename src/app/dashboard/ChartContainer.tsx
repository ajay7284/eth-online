import Axis from '@/components/graph/Axis';
import ClusterGraph from '@/components/graph/ClusterGraph'
import MomGraph from '@/components/graph/momGraph';
import OperatorsOverTime from '@/components/graph/OperatorsOverTime';
import QoqGraph from '@/components/graph/qoqGraph'
import ValidatorCountOverTime from '@/components/graph/ValidatorCountOverTime';
import ValidatorRadarChart from '@/components/graph/ValidatorMetricsRadarChart';
import { set } from 'date-fns';
import { get } from 'http';
import React from 'react'
import { useState,useEffect } from 'react'

export default function ChartContainer() {
const [operators, setOperators] = useState<any>(null);
const [validators, setValidators] = useState<any>(null);
const [operatorOvertime, setOperatorovertime] = useState<any>(null);
const [validatorOvertime, setValidatorovertime] = useState<any>(null);
const getdata = async () => {
  const data = await fetch('/api/get-dune-growthdata')
  const overtimedata = await fetch('/api/get-dune-overtime')
  const response = await data.json();
  const overtime_res = await overtimedata.json();
  const operatorReversedData = overtime_res.operators_overtime.result.rows.reverse();
  const validatorReversedData = overtime_res.validator_overtime.result.rows.reverse();
  setOperators(response.operators);  
  setValidators(response.validator);
  setOperatorovertime(operatorReversedData);
  setValidatorovertime(validatorReversedData);
  }

useEffect(() => {
getdata();
},[] )

  return (
    <>
    <div className="flex gap-6">
    <div className="flex-1  p-4 ">
        {validators && validators.validator_qoq?.result?.rows ? (
            <QoqGraph data={validators.validator_qoq.result.rows} title='Validators' />
          ) : (
            <p>Loading data...</p> // Optional loading message
          )}
      </div>
      <div className="flex-1  p-4 ">
        {operators && operators.operators_qoq?.result?.rows ? (
            <QoqGraph data={operators.operators_qoq.result.rows} title='Operators' />
          ) : (
            <p>Loading data...</p> // Optional loading message
          )}
      </div>
    </div>
    <div className="flex gap-6">
    <div className="flex-1  p-4 ">
        {validators && validators.validator_mom?.result?.rows ? (
            <MomGraph data={validators.validator_mom.result.rows} title='Validators' />
          ) : (
            <p>Loading data...</p> // Optional loading message
          )}
      </div>
      <div className="flex-1  p-4 ">
        {operators && operators.operators_mom?.result?.rows ? (
            <MomGraph data={operators.operators_mom.result.rows} title='Operators' />
          ) : (
            <p>Loading data...</p> // Optional loading message
          )}
      </div>
    </div>
    <div className="flex gap-6">
      {/* {console.log(operatorOvertime.result.rows)} */}
        <div className="flex-1  p-4 ">
          {operatorOvertime  ? (<OperatorsOverTime data={operatorOvertime} />):(<p>Loading data...</p>)}
      </div>
      <div className="flex-1  p-4 ">
       {validatorOvertime ? ( <OperatorsOverTime data={validatorOvertime} />):(<p>Loading data...</p>)}
      </div>
      </div>
      <div className="flex gap-6">
      <div className="flex-1  p-4 ">
        <ClusterGraph />
      </div>
      <div className="flex-1  p-4 ">
        <ValidatorRadarChart/>
        </div>
    </div>
    </>
  );
  
}
