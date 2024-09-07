import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

interface ValidatorData {
  entity: string;
  entity_category: string;
  validators: number;
}

const ValidatorRadarChart: React.FC = () => {
  const [chartData, setChartData] = useState<ValidatorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('/api/get-dune-growthdata');
        const response = await data.json();
        
        if (response.network_entities && response.network_entities.result && response.network_entities.result.rows) {
          const sortedData = response.network_entities.result.rows
            .sort((a: ValidatorData, b: ValidatorData) => b.validators - a.validators)
            .slice(0, 10);  // Get top 5 entities
          
          setChartData(sortedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to transform the data for the radar chart
  const transformData = (data: ValidatorData[]) => {
    const maxValidators = Math.max(...data.map(d => d.validators));
    return data.map(item => ({
      subject: item.entity,
      validators: item.validators,
      fullMark: maxValidators
    }));
  };

  const radarChartData = transformData(chartData);

  return (
    <div className="w-[700px] h-[700px] p-4 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Top 5 Entities by Validator Count</h2>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
          <Radar name="Validators" dataKey="validators" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ValidatorRadarChart;