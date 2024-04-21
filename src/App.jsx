import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageUploader from './components/ImageUploader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Image Uploader</h1>
      <ImageUploader />
  </div>
  )
}

export default App
