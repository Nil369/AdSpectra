export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="AdSpectra Logo" 
                className="h-6 w-6 object-contain logo-image"
              />
              <div className="text-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">AdSpectra</div>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered advertising budget optimization platform that helps businesses 
              maximize their ROI through intelligent predictions and analytics.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Budget Prediction</li>
              <li>Sales Analytics</li>
              <li>ROI Optimization</li>
              <li>Real-time Insights</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Support</li>
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Community</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Build with ❤️ by Akash Halder</p>
          <p>&copy; 2025 AdSpectra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}