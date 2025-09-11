import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Target, TrendingUp, Zap, Brain, Shield } from "lucide-react"

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Optimize Your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Advertising Budget</span>{" "}
            with AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AdSpectra uses advanced machine learning to predict optimal advertising 
            spend and maximize your return on investment across all channels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/prediction">Start Predicting</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link to="/analytics">View Analytics</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose AdSpectra?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform delivers insights that transform how you approach advertising spend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:shadow-lg hover-lift transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>AI-Powered Predictions</CardTitle>
              <CardDescription>
                Advanced machine learning algorithms analyze your data to provide accurate budget predictions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg hover-lift transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>ROI Optimization</CardTitle>
              <CardDescription>
                Maximize your return on investment with data-driven insights and recommendations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg hover-lift transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Real-time Analytics</CardTitle>
              <CardDescription>
                Monitor your advertising performance with interactive charts and live data visualization.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg hover-lift transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Trend Analysis</CardTitle>
              <CardDescription>
                Identify market trends and seasonal patterns to time your campaigns perfectly.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg hover-lift transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Fast Processing</CardTitle>
              <CardDescription>
                Get instant predictions and insights with our optimized machine learning pipeline.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg hover-lift transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>
                Your data is protected with enterprise-grade security and reliable infrastructure.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Optimize Your Ad Spend?</h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using AdSpectra to maximize their advertising ROI.
            </p>
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/prediction">Get Started Now</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}