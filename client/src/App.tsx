import { ModeToggle } from "./components/mode-toggle"
import { Button } from "./components/ui/button"


function App() {
	return (
		<div>
			<h1 className="text-4xl font-bold mb-2">Hello from AdSpectra</h1>
			<Button className="mr-2">Click Me</Button>
			<ModeToggle/>
		</div>
	)
}

export default App
