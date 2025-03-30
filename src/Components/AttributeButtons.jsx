const AttributeButtons = ({ artwork, banlist, onBan }) => {
    const currentAttributes = {
      classification: artwork?.classification,
      culture: artwork?.culture,
      person: artwork?.people?.[0]?.name,
      century: artwork?.century
    }
  
    return (
      <div className="attribute-buttons">
        {currentAttributes.classification && !banlist.classifications.includes(currentAttributes.classification) && (
          <button 
            onClick={() => onBan('classifications', currentAttributes.classification)}
            className="ban-button"
          >
            Ban {currentAttributes.classification} Art
          </button>
        )}
        
        {currentAttributes.culture && !banlist.cultures.includes(currentAttributes.culture) && (
          <button 
            onClick={() => onBan('cultures', currentAttributes.culture)}
            className="ban-button"
          >
            Ban {currentAttributes.culture} Culture
          </button>
        )}
        
        {currentAttributes.person && !banlist.people.includes(currentAttributes.person) && (
          <button 
            onClick={() => onBan('people', currentAttributes.person)}
            className="ban-button"
          >
            Ban Artist: {currentAttributes.person}
          </button>
        )}
        
        {currentAttributes.century && !banlist.centuries.includes(currentAttributes.century) && (
          <button 
            onClick={() => onBan('centuries', currentAttributes.century)}
            className="ban-button"
          >
            Ban {currentAttributes.century} Century
          </button>
        )}
      </div>
    )
  }
  
  export default AttributeButtons