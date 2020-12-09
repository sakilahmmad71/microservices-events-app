import './App.css'
import CreatePost from './components/CreatePost'
import ShowPosts from './components/ShowPosts'

function App() {
  return (
    <div className="container">
      <CreatePost />
      <ShowPosts />
    </div>
  )
}

export default App
