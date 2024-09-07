import Axis from '@/components/graph/Axis';
import ClusterGraph from '@/components/graph/ClusterGraph'
import MomGraph from '@/components/graph/momGraph';
import OperatorsOverTime from '@/components/graph/OperatorsOverTime';
import QoqGraph from '@/components/graph/qoqGraph'
import ValidatorCountOverTime from '@/components/graph/ValidatorCountOverTime';
import React from 'react'

export default function ChartContainer() {
  return (
    <>
    <div className="flex gap-6">
      <div className="flex-1  p-4 ">
        <MomGraph />
      </div>
      <div className="flex-1  p-4 ">
        <QoqGraph />
      </div>
    </div>
    <div className="flex gap-6">
        <div className="flex-1  p-4 ">
        <OperatorsOverTime />
      </div>
      <div className="flex-1  p-4 ">
        <ValidatorCountOverTime />
      </div>
      </div>
      <div className="flex gap-6">
      <div className="flex-1  p-4 ">
        <Axis />
      </div>
      <div className="flex-1  p-4 ">
        <QoqGraph />
      </div>
    </div>
    </>
  );
  
}
