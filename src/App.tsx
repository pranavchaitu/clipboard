import { Toaster } from "sonner"
import { Home } from "./components/home"
import { ThemeProvider } from "./components/theme-provider"
import { TopBar } from "./components/top-bar"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <div className="flex justify-center">
        <div className="w-full max-w-screen-lg">
          <TopBar />
          <Home />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
