import ClusterGraph from "@/components/graph/ClusterGraph";
import ValidatorRadarChart from "@/components/graph/ValidatorMetricsRadarChart";
import React from "react";

export default function NetworkDistribution() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-black bg-opacity-25 backdrop-blur-sm rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">
            Cluster Graph
          </h2>
          <ClusterGraph />
        </div>
        <div className="p-4 bg-black bg-opacity-25 backdrop-blur-sm rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">
            Validator Radar Chart
          </h2>
          <ValidatorRadarChart />
        </div>
      </div>{" "}
    </div>
  );
}
