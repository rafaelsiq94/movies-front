import { useEffect, useState } from "react";
import {
  fetchYearsWithMultipleWinners,
  fetchStudiosWithWinCount,
  fetchMaxMinWinIntervalForProducers,
  fetchWinnerByYear,
} from "../../services/movieService";
import {
  YearsWithMultipleWinners,
  StudiosWithWinCount,
  MaxMinWinIntervalForProducers,
  Movie,
} from "../../types";
import Table from "../../components/Table/Table";
import "./Dashboard.css";

const yearsWithMultipleWinnersColumns = [
  { name: "year", label: "Year" },
  { name: "winnerCount", label: "Winner Count" },
];

const studiosWithWinCountColumns = [
  { name: "name", label: "Name" },
  { name: "winCount", label: "Win Count" },
];

const maxMinWinIntervalForProducersColumns = [
  { name: "producer", label: "Producer" },
  { name: "interval", label: "Interval" },
  { name: "previousWin", label: "Previous Year" },
  { name: "followingWin", label: "Following Year" },
];

const winnerByYearColumns = [
  { name: "id", label: "Id" },
  { name: "year", label: "Year" },
  { name: "title", label: "Title" },
];

function Dashboard(): React.JSX.Element {
  const [yearsWithMultipleWinners, setYearsWithMultipleWinners] = useState<YearsWithMultipleWinners>({ years: [] });
  const [studiosWithWinCount, setStudiosWithWinCount] = useState<StudiosWithWinCount>({ studios: [] });
  const [maxMinWinIntervalForProducers, setMaxMinWinIntervalForProducers] = useState<MaxMinWinIntervalForProducers>({ max: [], min: [] });
  const [winnerByYear, setWinnerByYear] = useState<Movie[]>([]);
  const [year, setYear] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          yearsWithMultipleWinnersData,
          studiosWithWinCountData,
          maxMinWinIntervalForProducersData,
        ] = await Promise.all([
          fetchYearsWithMultipleWinners(),
          fetchStudiosWithWinCount(),
          fetchMaxMinWinIntervalForProducers(),
        ]);

        setYearsWithMultipleWinners(yearsWithMultipleWinnersData);
        setStudiosWithWinCount(studiosWithWinCountData);
        setMaxMinWinIntervalForProducers(maxMinWinIntervalForProducersData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const handleChangeYear = async () => {
    try {
      const winnerByYearData = await fetchWinnerByYear(year);
      setWinnerByYear(winnerByYearData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleYearInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(event.target.value);
  };

  return (
    <div className="grid-container">
      <div className="grid-item">
        <h2>List years with multiple winners</h2>
        <Table data={yearsWithMultipleWinners.years} columns={yearsWithMultipleWinnersColumns} />
      </div>
      <div className="grid-item">
        <h2>Top 3 studios with winner</h2>
        <Table data={studiosWithWinCount.studios.slice(0, 3)} columns={studiosWithWinCountColumns} />
      </div>
      <div className="grid-item">
        <h3>Producers with longest and shortest interval between wins</h3>
        <h4>Maximum</h4>
        <Table data={maxMinWinIntervalForProducers.max} columns={maxMinWinIntervalForProducersColumns} />
        <h4>Mininum</h4>
        <Table data={maxMinWinIntervalForProducers.min} columns={maxMinWinIntervalForProducersColumns} />
      </div>
      <div className="grid-item">
        <h2>List movie winners by year</h2>
        <div className="search">
          <input type="number" value={year} placeholder="Search by year" onChange={handleYearInputChange} />
          <button onClick={handleChangeYear}>Search</button>
        </div>
        <Table data={winnerByYear} columns={winnerByYearColumns} />
      </div>
    </div>
  );
}

export default Dashboard;