import React, { useEffect, useState } from 'react';
import './affichesql.css';

function MyComponent() {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/pro')
      .then(response => response.json())
      .then(data => {
        setData(data);
        const years = [...new Set(data.map(item => item.rentree_scolaire))];
        setYears(['ALL', ...years]);
        const departments = [...new Set(data.map(item => item.departement))];
        setDepartments(['ALL', ...departments]);
      })
      .catch(error => console.log(error));
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    console.log("Year selected:", event.target.value);
  }

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    console.log("Department selected:", event.target.value);
  }

  return (
    <div>
      <select value={selectedYear || ""} onChange={handleYearChange}>
        <option value="">-- Sélectionner une année --</option>
        {years.map(year => <option key={year} value={year}>{year}</option>)}
      </select>
      <select value={selectedDepartment || ""} onChange={handleDepartmentChange}>
        <option value="">-- Sélectionner un département --</option>
        {departments.map(department => <option key={department} value={department}>{department}</option>)}
      </select>
      <button onClick={() => {
        setSelectedYear(null);
        setSelectedDepartment(null);
      }}>Réinitialiser</button>
      {selectedYear !== null || selectedDepartment !== null ? (
        <table>
          <thead>
            <tr>
              {data.length > 0 && Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.filter(item => (
              (selectedYear === null || selectedYear === "ALL" || item.rentree_scolaire == selectedYear) &&
              (selectedDepartment === null || selectedDepartment === "ALL" || item.departement == selectedDepartment)
            )).map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default MyComponent;