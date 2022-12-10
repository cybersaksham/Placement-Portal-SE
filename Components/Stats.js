import React from 'react'

const Stats = ({ placementStats, heading }) => {
    return (
        <div className="col-lg-12 mb-3">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-12">
                            <h3>{heading}</h3>
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
                                <th>TOTAL</th>
                                <th>PLACED</th>
                                <th>PLACEMENT</th>
                                <th>HIGHEST</th>
                                <th>AVERAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {placementStats.map((el, i) =>
                                <tr key={i}>
                                    <td className="text-center">{i < placementStats.length - 1 ? i + 1 : ""}</td>
                                    <td className="txt-oflo">
                                        {i < placementStats.length - 1 ? el.branch : <b>{el.branch}</b>}
                                    </td>
                                    <td>
                                        <span className="text-info">
                                            {i < placementStats.length - 1 ? el.totalStudents : <b>{el.totalStudents}</b>}
                                        </span>
                                    </td>
                                    <td className="txt-oflo">
                                        {i < placementStats.length - 1 ? el.placedStudents : <b>{el.placedStudents}</b>}
                                    </td>
                                    <td>
                                        <span className="text-info">
                                            {i < placementStats.length - 1 ? el.placement : <b>{el.placement}</b>}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-success">
                                            {i < placementStats.length - 1 ? el.highest : <b>{el.highest}</b>}
                                        </span>
                                    </td>
                                    <td className="txt-oflo">
                                        {i < placementStats.length - 1 ? el.average : <b>{el.average}</b>}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Stats