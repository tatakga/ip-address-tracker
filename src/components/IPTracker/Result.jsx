
const Result = ({
  ip,
  location,
  timezone,
  isp }) => {
  return (
    <div className="result">
      <div>
        <p className="category">IP ADDRESS</p>
        {ip && <p className="result-text">{ip}</p>}
      </div>
      <div>
        <p className="category">LOCATION</p>
        {location && <p className="result-text">{location}</p>}
      </div>
      <div>
        <p className="category">TIMEZONE</p>
        {timezone && <p className="result-text">{timezone}</p>}
      </div>
      <div>
        <p className="category">ISP</p>
        {isp && <p className="result-text">{isp}</p>}
      </div>
    </div>
  )
}

export default Result
