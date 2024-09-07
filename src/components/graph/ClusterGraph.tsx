"use client"

import React, { useState, useRef, useEffect } from 'react'
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { set } from 'date-fns';

// Initialize the Apollo Client
const client = new ApolloClient({
  uri: `https://gateway.thegraph.com/api/${process.env.SUNGRAPH_ENV}/subgraphs/id/7V45fKPugp9psQjgrGsfif98gWzCyC6ChN7CW98VyQnr`,
  cache: new InMemoryCache()
});

const GET_CLUSTERS = gql`
  query GetClusters($first: Int!, $skip: Int!) {
    clusters(first: $first, skip: $skip) {
      active
      balance
      operatorIds
    }
  }
`;


interface ClusterGroup {
  id: number
  operatorCount: number
  clusterCount: number
  x: number
  y: number
}
async function fetchAllClusters() {
  const pageSize = 1000;
  let skip = 0;
  let allClusters: any[] = [];
  let hasMore = true;

  while (hasMore) {
    try {
      const { data } = await client.query({
        query: GET_CLUSTERS,
        variables: { first: pageSize, skip: skip }
      });

      if (data.clusters.length > 0) {
        allClusters = allClusters.concat(data.clusters);
        skip += pageSize;
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error('Error fetching clusters:', error);
      hasMore = false;
    }
  }
  return allClusters;
}


function groupClustersByOperatorIdsLength(clusters:any[]) {
  const groups:any = {
    4: [],
    7: [],
    10: [],
    13: []
  };

  clusters.forEach(cluster => {
    const length = cluster.operatorIds.length;
    if (groups.hasOwnProperty(length)) {
      groups[length].push(cluster);
    }
  });
console.log('groups:', groups);
  return groups;
}
const colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3']

export default function ClusterGraph() {
  const [data, setData] = useState<ClusterGroup[]>([]);
  const [selectedBubble, setSelectedBubble] = useState<ClusterGroup | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [clusterGroups, setClusterGroups] = useState<any | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedClusters = await fetchAllClusters();
      const groups = groupClustersByOperatorIdsLength(fetchedClusters);
      setClusterGroups(groups);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (clusterGroups) {
      const newData: ClusterGroup[] = [
        { id: 1, operatorCount: 4, clusterCount: clusterGroups[4].length, x: 25, y: 25 },
        { id: 2, operatorCount: 7, clusterCount: clusterGroups[7].length, x: 75, y: 25 },
        { id: 3, operatorCount: 10, clusterCount: clusterGroups[10].length, x: 25, y: 75 },
        { id: 4, operatorCount: 13, clusterCount: clusterGroups[13].length, x: 75, y: 75 },
      ];
      setData(newData);
    }
  }, [clusterGroups]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging !== null && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setData(prevData => 
          prevData.map(item => 
            item.id === dragging ? { ...item, x, y } : item
          )
        );
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const maxClusterCount = Math.max(...data.map(d => d.clusterCount));

  return (
    <div className="w-full max-w-3xl mx-auto p-4  ">
      <h2 className="text-2xl font-bold mb-4 text-center">Interactive Cluster Distribution</h2>
      <div ref={containerRef} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        {data.map((item, index) => {
          const size = (item.clusterCount / maxClusterCount) * 40 + 10; // 10% to 50% of container
          return (
            <div
              key={item.id}
              className="absolute rounded-full flex items-center justify-center cursor-move transition-shadow duration-300 hover:shadow-lg"
              style={{
                width: `${size}%`,
                height: `${size}%`,
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: colors[index % colors.length],
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                setDragging(item.id);
              }}
              onClick={() => setSelectedBubble(item)}
            >
              <div className="text-white text-center">
                <div className="font-bold text-xs sm:text-sm md:text-base">{item.operatorCount} ops</div>
                <div className="text-xs sm:text-sm md:text-base">{item.clusterCount} clusters</div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedBubble && (
        <div className="mt-4 p-4 bg-gray-200 rounded-md">
          <h3 className="text-lg font-semibold">Selected Bubble Details</h3>
          <p>Operator Count: {selectedBubble.operatorCount}</p>
          <p>Cluster Count: {selectedBubble.clusterCount}</p>
        </div>
      )}
      <div className="mt-4 flex flex-wrap justify-center">
        {data.map((item, index) => (
          <div key={item.id} className="flex items-center mr-4 mb-2">
            <div
              className="w-4 h-4 mr-2"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <span className="text-sm">{item.operatorCount} Operators</span>
          </div>
        ))}
      </div>
    </div>
  );
}
