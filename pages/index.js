import { useContext, useEffect, useState } from "react"
import Stats from "../Components/Stats";
import StatsContext from "../Context/Stats/StatsContext"

export default function Home() {
  const { getStats, internStats, placementStats } = useContext(StatsContext);
  const [year, setYear] = useState(new Date().getFullYear());
  const [searchedYear, setSearchedYear] = useState(new Date().getFullYear());

  const searchStats = () => {
    setSearchedYear(year);
    getStats({ year, type: "Intern" });
    getStats({ year, type: "Job" });
  }

  useEffect(() => {
    searchStats();
  }, [])

  return (
    <div className="container-fluid">
      <div className="mb-3 row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
          Graduation Year
        </label>
        <div className="col-sm-8">
          <input
            placeholder="Year" type="number"
            className="form-control"
            aria-describedby="button-addon2"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="col-sm-2">
          <button
            className="btn btn-outline-primary"
            type="button"
            id="button-addon2"
            onClick={searchStats}
          >
            Search
          </button>
        </div>
      </div>
      <Stats placementStats={placementStats} heading={`Placement Statistics ${searchedYear}`} />
      <Stats placementStats={internStats} heading={`Intern Statistics ${searchedYear}`} />
    </div>
  )
}
