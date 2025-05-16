// import "./index.css";
// import "https://fonts.gstatic.com/s/bricolagegrotesque/v8/3y9K6as8bTXq_nANBjzKo3IeZx8z6up5BeSl9D4dj_x9PpZBMlGGInHEVA.woff2";
import { Toaster } from "sonner"
import { Home } from "./components/home"
import { ThemeProvider } from "./components/theme-provider"
import { TopBar } from "./components/top-bar"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <div style={{fontFamily : "BricolageGrotesque"}} className="p-4 flex justify-center">
        <div className="w-full max-w-screen-lg">
          <TopBar />
          <Home />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
