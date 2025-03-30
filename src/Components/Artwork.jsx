const Artwork = ({ artwork }) => {
    return (
      <div className="artwork-container">
        <h2>{artwork.title || 'Untitled'}</h2>
        <p>{artwork.people?.[0]?.name || 'Unknown artist'}</p>
        <p>{artwork.dated || 'Unknown date'}</p>
        
        {artwork.primaryimageurl ? (
          <div className="image-wrapper">
            <img 
              src={artwork.primaryimageurl} 
              alt={artwork.title || 'Artwork from Harvard Museum'} 
            />
          </div>
        ) : (
          <p>No image available</p>
        )}
      </div>
    )
  }
  
  export default Artwork