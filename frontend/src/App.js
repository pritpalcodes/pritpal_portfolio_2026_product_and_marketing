import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import Home from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import WritingDetail from "@/pages/WritingDetail";
import PlaygroundDetail from "@/pages/PlaygroundDetail";
import ScrollProgress from "@/components/ScrollProgress";
import ClickPop from "@/components/ClickPop";
import ScrollToTop from "@/components/ScrollToTop";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <ScrollProgress />
        <ClickPop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/writing/:slug" element={<WritingDetail />} />
          <Route path="/playground/:slug" element={<PlaygroundDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
