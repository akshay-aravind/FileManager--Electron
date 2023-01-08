import logo from "./logo.svg"
import "./App.css"
import { useState } from "react"

const fs = window.require("fs")
const pathModule = window.require("path")

const { app } = window.require("@electron/remote")

const formatSize = (size) => {
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  )
}

function App() {
  const [path, setPath] = useState(app.getAppPath())

  const files = fs.readdirSync(path).map((file) => {
    const stats = fs.statSync(pathModule.join(path, file))
    return {
      name: file,
      size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
      directory: stats.isDirectory(),
    }
  }).sort((a, b) => {
    if (a.directory === b.directory) {
      return a.name.localeCompare(b.name)
    }
    return a.directory ? -1 : 1
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
