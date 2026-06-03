import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import ProjectPreviewModal from './components/UI/ProjectPreviewModal'

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainLayout setSelectedProject={setSelectedProject} />}
        >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="projects"
            element={<Projects setSelectedProject={setSelectedProject} />}
          />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>

      <ProjectPreviewModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </BrowserRouter>
  )
}