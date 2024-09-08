import FailTxRadarGraph from "@/components/graph/FailTxRadarGraph";
import React from "react";

export default function FailedTransaction() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="p-4 bg-black bg-opacity-25 backdrop-blur-sm rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">
            Failed Transaction Radar Graph
          </h2>
          <FailTxRadarGraph />
        </div>
      </div>
    </div>
  );
}
