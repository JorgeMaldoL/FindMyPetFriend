import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DashboardCharts = ({ pets }) => {
  // Chart 1: Pets by Species
  const speciesData = useMemo(() => {
    const counts = {};
    pets.forEach(pet => {
      const species = pet.species || 'Unknown';
      counts[species] = (counts[species] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [pets]);


  // Chart 2: Pets by Gender
  const genderData = useMemo(() => {
    const counts = {};
    pets.forEach(pet => {
      const gender = pet.gender || 'Unknown';
      counts[gender] = (counts[gender] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [pets]);

  // Chart 3: Pets by Age Group
  const ageData = useMemo(() => {
    const counts = { Puppy: 0, Kitten: 0, Adult: 0, Senior: 0, Unknown: 0 };
    pets.forEach(pet => {
      let group = 'Unknown';
      if (pet.age) {
        if (pet.age.toLowerCase().includes('baby')) group = pet.species === 'Cat' ? 'Kitten' : 'Puppy';
        else if (pet.age.toLowerCase().includes('young') || pet.age.toLowerCase().includes('adult')) group = 'Adult';
        else if (pet.age.toLowerCase().includes('senior')) group = 'Senior';
      }
      counts[group] = (counts[group] || 0) + 1;
    });
    return Object.entries(counts).filter(([_, v]) => v > 0).map(([name, value]) => ({ name, value }));
  }, [pets]);

  // Toggle state
  const [showAge, setShowAge] = useState(false);

  if (!pets || pets.length === 0) {
    return <div style={{textAlign: 'center', margin: '2rem'}}>No data to display charts.</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', margin: '2rem 0' }}>
      <div style={{ width: 350, height: 300, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #0001', padding: 16 }}>
        <h3 style={{ textAlign: 'center' }}>Pets by Species</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={speciesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {speciesData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: 350, height: 300, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #0001', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ textAlign: 'center', margin: 0 }}>
            {showAge ? 'Pets by Age Group' : 'Pets by Gender'}
          </h3>
          <button onClick={() => setShowAge(v => !v)} style={{ fontSize: 13, padding: '4px 10px', borderRadius: 6, border: '1px solid #ccc', background: '#f8f9fa', cursor: 'pointer' }}>
            {showAge ? 'Show Gender' : 'Show Age'}
          </button>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          {showAge ? (
            <BarChart data={ageData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#00C49F">
                {ageData.map((entry, idx) => (
                  <Cell key={`cell-age-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <BarChart data={genderData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {genderData.map((entry, idx) => (
                  <Cell key={`cell-bar-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
