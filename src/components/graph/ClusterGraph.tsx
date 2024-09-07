"use client"

import React, { useState, useRef, useEffect } from 'react'

interface ClusterGroup {
  id: number
  operatorCount: number
  clusterCount: number
  x: number
  y: number
}

const initialData: ClusterGroup[] = [
  { id: 1, operatorCount: 4, clusterCount: 10, x: 25, y: 25 },
  { id: 2, operatorCount: 7, clusterCount: 1, x: 75, y: 25 },
  { id: 3, operatorCount: 11, clusterCount: 25, x: 25, y: 75 },
  { id: 4, operatorCount: 20, clusterCount: 5, x: 75, y: 75 },
]

const colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3']

export default function InteractiveBubbleChart() {
  const [data, setData] = useState<ClusterGroup[]>(initialData)
  const [selectedBubble, setSelectedBubble] = useState<ClusterGroup | null>(null)
  const [dragging, setDragging] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const maxClusterCount = Math.max(...data.map(d => d.clusterCount))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging !== null && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setData(prevData => 
          prevData.map(item => 
            item.id === dragging ? { ...item, x, y } : item
          )
        )
      }
    }

    const handleMouseUp = () => {
      setDragging(null)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging])

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Interactive Cluster Distribution</h2>
      <div ref={containerRef} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        {data.map((item, index) => {
          const size = (item.clusterCount / maxClusterCount) * 40 + 10 // 10% to 50% of container
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
                e.preventDefault()
                setDragging(item.id)
              }}
              onClick={() => setSelectedBubble(item)}
            >
              <div className="text-white text-center">
                <div className="font-bold text-xs sm:text-sm md:text-base">{item.operatorCount} ops</div>
                <div className="text-xs sm:text-sm md:text-base">{item.clusterCount} clusters</div>
              </div>
            </div>
          )
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
  )
}
