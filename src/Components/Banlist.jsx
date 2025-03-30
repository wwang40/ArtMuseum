const Banlist = ({ bans, onUnban }) => {
  return (
    <div className='banlist'>
      <h2>Ban List</h2>
      
      <h3>Classifications</h3>
      <ul>
        {bans.classifications.map((item, index) => (
          <li 
            key={`classification-${index}`}
            onClick={() => onUnban('classifications', item)}
            className="banlist-item"
          >
            {item}
          </li>
        ))}
      </ul>
      
      <h3>Cultures</h3>
      <ul>
        {bans.cultures.map((item, index) => (
          <li 
            key={`culture-${index}`}
            onClick={() => onUnban('cultures', item)}
            className="banlist-item"
          >
            {item}
          </li>
        ))}
      </ul>
      
      <h3>Artists</h3>
      <ul>
        {bans.people.map((item, index) => (
          <li 
            key={`person-${index}`}
            onClick={() => onUnban('people', item)}
            className="banlist-item"
          >
            {item}
          </li>
        ))}
      </ul>
      
      <h3>Centuries</h3>
      <ul>
        {bans.centuries.map((item, index) => (
          <li 
            key={`century-${index}`}
            onClick={() => onUnban('centuries', item)}
            className="banlist-item"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Banlist