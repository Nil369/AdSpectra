import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, TrendingUp, DollarSign, Target } from "lucide-react"

const formSchema = z.object({
  tvBudget: z.string().min(1, "TV budget is required"),
  radioBudget: z.string().min(1, "Radio budget is required"),
  digitalBudget: z.string().min(1, "Digital budget is required"),
  influencerBudget: z.string().min(1, "Influencer budget is required"),
  outdoorBudget: z.string().min(1, "Outdoor budget is required"),
})

type FormData = z.infer<typeof formSchema>

interface PredictionResult {
  predictedSales: number
  roi: number
  confidence: number
}

export function PredictionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tvBudget: "",
      radioBudget: "",
      digitalBudget: "",
      influencerBudget: "",
      outdoorBudget: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    
    try {
      // Convert string values to numbers
      const numericData = {
        tvBudget: parseFloat(data.tvBudget),
        radioBudget: parseFloat(data.radioBudget),
        digitalBudget: parseFloat(data.digitalBudget),
        influencerBudget: parseFloat(data.influencerBudget),
        outdoorBudget: parseFloat(data.outdoorBudget),
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock prediction result
      const totalBudget = numericData.tvBudget + numericData.radioBudget + numericData.digitalBudget + numericData.influencerBudget + numericData.outdoorBudget
      const predictedSales = totalBudget * (2.5 + Math.random() * 0.5)
      const roi = (predictedSales / totalBudget) * 100
      const confidence = 85 + Math.random() * 10
      
      setPrediction({
        predictedSales,
        roi,
        confidence
      })
    } catch (error) {
      console.error("Prediction failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Advertising Budget <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Prediction</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your advertising budget allocation across different channels to get AI-powered sales predictions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>
                Enter your planned advertising budget for each channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="tvBudget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TV Advertising Budget ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="10000" 
                            {...field} 
                            className="text-lg"
                          />
                        </FormControl>
                        <FormDescription>
                          Budget allocated for television advertising
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="radioBudget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Radio Advertising Budget ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="5000" 
                            {...field} 
                            className="text-lg"
                          />
                        </FormControl>
                        <FormDescription>
                          Budget allocated for radio advertising
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="digitalBudget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Digital Advertising Budget ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="15000" 
                            {...field} 
                            className="text-lg"
                          />
                        </FormControl>
                        <FormDescription>
                          Budget for online and digital advertising
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="influencerBudget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Influencer Marketing Budget ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="8000" 
                            {...field} 
                            className="text-lg"
                          />
                        </FormControl>
                        <FormDescription>
                          Budget for influencer partnerships
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="outdoorBudget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Outdoor Advertising Budget ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="3000" 
                            {...field} 
                            className="text-lg"
                          />
                        </FormControl>
                        <FormDescription>
                          Budget for billboards and outdoor advertising
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full text-lg py-6" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Prediction...
                      </>
                    ) : (
                      "Predict Sales"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {prediction ? (
              <>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800 dark:text-green-200">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Predicted Sales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-800 dark:text-green-200">
                      ${prediction.predictedSales.toLocaleString()}
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      Based on your budget allocation
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
                      <DollarSign className="mr-2 h-5 w-5" />
                      Return on Investment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                      {prediction.roi.toFixed(1)}%
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                      Expected ROI from your investment
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-800 dark:text-purple-200">
                      <Target className="mr-2 h-5 w-5" />
                      Confidence Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-800 dark:text-purple-200">
                      {prediction.confidence.toFixed(1)}%
                    </div>
                    <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">
                      Model confidence in this prediction
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-dashed border-2 border-muted-foreground/25">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <TrendingUp className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    No Prediction Yet
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-sm">
                    Enter your advertising budget allocation in the form to get AI-powered sales predictions.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}