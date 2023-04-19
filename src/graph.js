import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'

function Graph() {
  const [data, setData] = useState(null);
  const [proTotal, setProTotal] = useState(0);
  const [genTotal, setGenTotal] = useState(0);
  const [ecoleTotal, setEcoleTotal] = useState(0);
  const [proTotal2019, setProTotal2019] = useState(0);
  const [proTotal2020, setProTotal2020] = useState(0);
  const [proTotal2021, setProTotal2021] = useState(0);
  const [genTotal2019, setGenTotal2019] = useState(0);
  const [genTotal2020, setGenTotal2020] = useState(0);
  const [genTotal2021, setGenTotal2021] = useState(0);
  const [ecoleTotal2019, setEcoleTotal2019] = useState(0);
  const [ecoleTotal2020, setEcoleTotal2020] = useState(0);
  const [ecoleTotal2021, setEcoleTotal2021] = useState(0);
  

  // Ajouter un état pour gérer l'année sélectionnée dans la combolist
  const [selectedYear, setSelectedYear] = useState('2019');

  // Fonction pour mettre à jour l'année sélectionnée
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    // Récupérer les données depuis les trois serveurs
    Promise.all([
      fetch('http://localhost:4000/pro').then(response => response.json()),
      fetch('http://localhost:5000/gen').then(response => response.json()),
      fetch('http://localhost:2000/ecole').then(response => response.json())
    ])
      .then(([proData, genData, ecoleData]) => {
        setData({
          pro: proData,
          gen: genData,
          ecole: ecoleData
        });
        // Calculer le total de chaque propriété 'nombre_d_eleves' et par année
        const proTotal = proData.reduce((acc, item) => acc + item.nombre_d_eleves, 0);
        setProTotal(proTotal);
        const proTotal2019 = proData.reduce((acc, item) => {
          if (item.rentree_scolaire == 2019) {
            return acc + item.nombre_d_eleves;
          }
          return acc;
        }, 0);
        setProTotal2019(proTotal2019);
        const proTotal2020 = proData.reduce((acc, item) => {
          if (item.rentree_scolaire == 2020) {
            return acc + item.nombre_d_eleves;
          }
          return acc;
        }, 0);
        setProTotal2020(proTotal2020);
        const proTotal2021 = proData.reduce((acc, item) => {
          if (item.rentree_scolaire == 2021) {
            return acc + item.nombre_d_eleves;
          }
          return acc;
        }, 0);
        setProTotal2021(proTotal2021);
        const genTotal = genData.reduce((acc, item) => acc + item.nombre_d_eleves, 0);
        setGenTotal(genTotal);
        // Total des élèves de 2019
        const genTotal2019 = genData.reduce((acc, item) => {
            if (item.rentree_scolaire == 2019) {
            return acc + item.nombre_d_eleves;
            }
            return acc;
            }, 0);
            setGenTotal2019(genTotal2019);
            const genTotal2020 = genData.reduce((acc, item) => {
            if (item.rentree_scolaire == 2020) {
            return acc + item.nombre_d_eleves;
            }
            return acc;
            }, 0);
            setGenTotal2020(genTotal2020);
            const genTotal2021 = genData.reduce((acc, item) => {
            if (item.rentree_scolaire == 2021) {
            return acc + item.nombre_d_eleves;
            }
            return acc;
            }, 0);
            setGenTotal2021(genTotal2021);
            const ecoleTotal = ecoleData.reduce((acc, item) => acc + item.nombre_d_eleves, 0);
            setEcoleTotal(ecoleTotal);
            // Total des élèves de 2019
            const ecoleTotal2019 = ecoleData.reduce((acc, item) => {
            if (item.rentree_scolaire == 2019) {
            return acc + item.nombre_d_eleves;
            }
            return acc;
            }, 0);
            setEcoleTotal2019(ecoleTotal2019);
            const ecoleTotal2020 = ecoleData.reduce((acc, item) => {
            if (item.rentree_scolaire == 2020) {
            return acc + item.nombre_d_eleves;
            }
            return acc;
            }, 0);
            setEcoleTotal2020(ecoleTotal2020);
            const ecoleTotal2021 = ecoleData.reduce((acc, item) => {
            if (item.rentree_scolaire == 2021) {
            return acc + item.nombre_d_eleves;
            }
            return acc;
            }, 0);
            setEcoleTotal2021(ecoleTotal2021);
            })
            .catch(error => console.log(error));
            }, []);

            
            const pieChartData = [
                {
                  name: 'Professionnels',
                  value:
                    selectedYear === '2019'
                      ? proTotal2019
                      : selectedYear === '2020'
                      ? proTotal2020
                      : proTotal2021,
                },
                {
                  name: 'Généraux',
                  value:
                    selectedYear === '2019'
                      ? genTotal2019
                      : selectedYear === '2020'
                      ? genTotal2020
                      : genTotal2021,
                },
                {
                  name: 'Écoles primaires',
                  value:
                    selectedYear === '2019'
                      ? ecoleTotal2019
                      : selectedYear === '2020'
                      ? ecoleTotal2020
                      : ecoleTotal2021,
                },
              ];
            
              const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

            return (
                <div>
                  <h2>Graphiques</h2>
                  {data && (
                    <>
                      {/* Ajouter une combolist pour sélectionner l'année */}
                      <label htmlFor="year-select">Sélectionnez une année: </label>
                      <select id="year-select" value={selectedYear} onChange={handleYearChange}>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                      </select>
            
                      {/* Ajouter un camembert */}
                      <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <text x="50%" y="6%" textAnchor="middle" fontSize="18px" fontWeight="bold">
                            Proportion d'etudiant par annees et par cursus
                            </text>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                            <p>Total des élèves: {proTotal + genTotal + ecoleTotal}</p>
                            <p>Total des élèves professionnels: {proTotal}</p>
                            <p>Total des élèves généraux: {genTotal}</p>
                            <p>Total des élèves en écoles primaires: {ecoleTotal}</p>
                            <p>Nombre d'élèves professionnels en 2019: {proTotal2019}</p>
                            <p>Nombre d'élèves professionnels en 2020: {proTotal2020}</p>
                            <p>Nombre d'élèves professionnels en 2021: {proTotal2021}</p>
                            <p>Nombre d'élèves généraux en 2019: {genTotal2019}</p>
                            <p>Nombre d'élèves généraux en 2020: {genTotal2020}</p>
                            <p>Nombre d'élèves généraux en 2021: {genTotal2021}</p>
                            <p>Nombre d'élèves en écoles primaires en 2019: {ecoleTotal2019}</p>
                            <p>Nombre d'élèves en écoles primaires en 2020: {ecoleTotal2020}</p>
                            <p>Nombre d'élèves en écoles primaires en 2021: {ecoleTotal2021}</p>
                        </>
                    )}
                </div>
            );
            
            
            
                    }      

export default Graph;
