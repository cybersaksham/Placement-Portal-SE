import { useContext, useEffect, useState } from "react"
import Loader from "../Components/Loader";
import Stats from "../Components/Stats";
import StatsContext from "../Context/Stats/StatsContext"

export default function Home() {
  const { getStats, internStats, placementStats } = useContext(StatsContext);
  const [year, setYear] = useState(new Date().getFullYear());
  const [searchedYear, setSearchedYear] = useState(new Date().getFullYear());
  const [loader, setLoader] = useState(true);

  const searchStats = async () => {
    setLoader(true);
    setSearchedYear(year);
    await getStats({ year, type: "Intern" });
    await getStats({ year, type: "Job" });
    setLoader(false);
  }

  useEffect(() => {
    searchStats();
    //eslint-disable-next-line
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
      {loader ?
        <Loader />
        : <>
          <Stats placementStats={placementStats} heading={`Placement Statistics ${searchedYear}`} />
          <Stats placementStats={internStats} heading={`Intern Statistics ${searchedYear}`} />
        </>}
    </div>
  )
}
