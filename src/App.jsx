import { useState, useEffect } from 'react'
import './App.css'
import Banlist from './Components/Banlist'
import Artwork from './Components/Artwork'
import AttributeButtons from './Components/AttributeButtons'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY
const MAX_RETRIES = 10

function App() {
  const [banlist, setBanlist] = useState({
    classifications: [],
    cultures: [],
    people: [],
    centuries: []
  })
  const [artwork, setArtwork] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const isBanned = (artwork) => {
    if (!artwork) return false
    return (
      banlist.classifications.includes(artwork.classification) ||
      banlist.cultures.includes(artwork.culture) ||
      banlist.people.some(artist => artwork.people?.some(p => p.name === artist)) ||
      banlist.centuries.includes(artwork.century)
    )
  }

  const handleGenerateImage = async (retry = 0) => {
    if (retry >= MAX_RETRIES) {
      setIsFetching(false)
      console.error("Max retries reached without finding suitable image")
      return
    }

    setIsFetching(true)
    try {
      const randomPage = Math.floor(Math.random() * 100) + 1
      
      const queryParams = new URLSearchParams({
        apikey: ACCESS_KEY,
        size: 1,
        page: randomPage,
        hasimage: 1,
        sort: 'random'
      })
      
      const response = await fetch(
        `https://api.harvardartmuseums.org/object?${queryParams.toString()}`
      )
      
      const data = await response.json()
      const newArtwork = data.records[0]
      
      if (isBanned(newArtwork)) {
        setRetryCount(prev => prev + 1)
        handleGenerateImage(retry + 1)
      } else {
        setArtwork(newArtwork)
        setRetryCount(0)
        setIsFetching(false)
      }
    } catch (err) {
      console.error("Error fetching artwork:", err)
      setIsFetching(false)
    }
  }

  const banAttribute = (type, value) => {
    if (!value) return
    
    setBanlist(prev => ({
      ...prev,
      [type]: [...prev[type], value]
    }))
  }

  const unbanAttribute = (type, value) => {
    setBanlist(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }))
  }

  useEffect(() => {
    if (artwork && isBanned(artwork)) {
      handleGenerateImage()
    }
  }, [banlist])

  return (
    <div className="main-container">
      <div className="sidebar">
        <Banlist bans={banlist} onUnban={unbanAttribute} />
      </div>

      <div className="content">
        <div className='header'>
          <h1>Harvard Art Museum</h1>
          <h3>Click the button to generate art</h3>
        </div>
        
        <div className='generate'>
          <button onClick={() => handleGenerateImage()} disabled={isFetching}>
            {isFetching ? `Loading... (${retryCount})` : 'Generate Image'}
          </button>
        </div>
        
        {artwork && !isBanned(artwork) && (
          <>
            <Artwork artwork={artwork} />
            <AttributeButtons 
              artwork={artwork} 
              banlist={banlist}
              onBan={banAttribute} 
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App