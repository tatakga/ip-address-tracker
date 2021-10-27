import { useState } from "react"
import IconSubmit from "../../images/icon-arrow.svg"
const Header = ({ setIpDomain }) => {
  const [input, setInput] = useState("")
  return (
    <div className="header">
      <h1>IP Address Tracker</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        setIpDomain(input)
      }}>
        <div className="input-container">
          <input type="text" placeholder="IP or domain" value={input} onChange={(e) => setInput(e.target.value)} />
          <button>
            <img src={IconSubmit} alt="" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Header
