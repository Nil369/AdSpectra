import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2, TrendingUp, IndianRupee } from "lucide-react"

const formSchema = z.object({
  tvBudget: z.string().min(1, "TV budget is required"),
  radioBudget: z.string().min(1, "Radio budget is required"),
  newspaperBudget: z.string().min(1, "Newspaper budget is required"),
})

type FormData = z.infer<typeof formSchema>

interface ApiResponse {
  success: boolean
  input: {
    "TV Ad Budget": number
    "Radio Ad Budget": number  
    "Newspaper Ad Budget": number
  }
  prediction: {
    prediction: number
    confidence_r2: number
    mae: number
    mse: number
    rmse: number
  }
}

export function PredictionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<ApiResponse | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tvBudget: "",
      radioBudget: "",
      newspaperBudget: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    
    try {
      const payload = {
        TV_Ad_Budget: parseFloat(data.tvBudget),
        Radio_Ad_Budget: parseFloat(data.radioBudget),
        Newspaper_Ad_Budget: parseFloat(data.newspaperBudget),
      }
      
      const response = await axios.post<ApiResponse>('/api/predict', payload)
      setPrediction(response.data)
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
                        <FormLabel>TV Advertising Budget (₹ Thousands)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="230.1" 
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
                        <FormLabel>Radio Advertising Budget (₹ Thousands)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="37.2" 
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
                    name="newspaperBudget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Newspaper Advertising Budget (₹ Thousands)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="69.97" 
                            {...field} 
                            className="text-lg"
                          />
                        </FormControl>
                        <FormDescription>
                          Budget for newspaper advertising
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
            {isLoading ? (
              <>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800 dark:text-green-200">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Predicted Sales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
                      <IndianRupee className="mr-2 h-5 w-5" />
                      Model Confidence (R²)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-24 mb-2" />
                    <Skeleton className="h-4 w-40" />
                  </CardContent>
                </Card>
              </>
            ) : prediction ? (
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
                      ₹{prediction.prediction.prediction.toFixed(2)} x 10 <sup>6</sup> Lakh
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      Based on your budget allocation
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
                      <IndianRupee className="mr-2 h-5 w-5" />
                      Model Confidence (R²)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                      {prediction.prediction.confidence_r2.toFixed(2)}%
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                      Model accuracy confidence score
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