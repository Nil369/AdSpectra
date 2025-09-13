import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft, Search } from "lucide-react"

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
            <CardHeader className="pb-6">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                404
              </CardTitle>
              <CardDescription className="text-xl text-gray-600 dark:text-gray-400">
                Oops! The page you're looking for doesn't exist.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-6">
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  The page you are trying to access might have been moved, deleted, or you might have entered the wrong URL. 
                  Don't worry, it happens to the best of us!
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    What you can do:
                  </h3>
                  <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                    <li>• Check the URL for any typos</li>
                    <li>• Go back to the previous page</li>
                    <li>• Visit our homepage to start fresh</li>
                    <li>• Explore our analytics and prediction tools</li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="gap-2">
                    <Link to="/">
                      <Home className="w-4 h-4" />
                      Back to Home
                    </Link>
                  </Button>
                  
                  <Button variant="outline" size="lg" className="gap-2" onClick={() => window.history.back()}>
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Need help? Visit our{" "}
                    <Link to="/analytics" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Analytics Dashboard
                    </Link>
                    {" "}or try our{" "}
                    <Link to="/prediction" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Prediction Tool
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}