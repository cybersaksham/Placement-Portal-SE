export default function Home() {
  return (
    <div className="container-fluid">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12">
                <h3>Placement Statistics 2022-23</h3>
                <h5 className="font-light text-muted">Placement Cell, MNIT Jaipur</h5>
              </div>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th>BRANCH</th>
                  <th>OFFERS</th>
                  <th>PLACED</th>
                  <th>PLACEMENT</th>
                  <th>HIGHEST</th>
                  <th>AVERAGE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">1</td>
                  <td className="txt-oflo">B.ARCH.</td>
                  <td>
                    <span className="text-info">16</span>
                  </td>
                  <td className="txt-oflo">16</td>
                  <td>
                    <span className="text-info">69.75%</span>
                  </td>
                  <td>
                    <span className="text-success">6.75 LPA</span>
                  </td>
                  <td className="txt-oflo">5.36 LPA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
