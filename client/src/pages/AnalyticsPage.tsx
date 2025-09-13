import { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ScatterChart,
    Scatter
} from "recharts"
import { actual_dataset } from "@/constants/dataset"

interface AnalyticsResponse {
  success: boolean
  metrics: {
    model_accuracy: number
    mae: number
    mse: number
    rmse: number
  }
}

// Process dataset for charts
const processedData = actual_dataset.slice(0, 50).map((item, index) => ({
  id: index + 1,
  tvBudget: item["TV Ad Budget"],
  radioBudget: item["Radio Ad Budget"],
  newspaperBudget: item["Newspaper Ad Budget"],
  sales: item.Sales,
  totalBudget: item["TV Ad Budget"] + item["Radio Ad Budget"] + item["Newspaper Ad Budget"]
}))

const budgetDistribution = [
  { 
    name: "TV", 
    value: processedData.reduce((sum, item) => sum + item.tvBudget, 0) / processedData.length,
    color: "#8884d8" 
  },
  { 
    name: "Radio", 
    value: processedData.reduce((sum, item) => sum + item.radioBudget, 0) / processedData.length,
    color: "#82ca9d" 
  },
  { 
    name: "Newspaper", 
    value: processedData.reduce((sum, item) => sum + item.newspaperBudget, 0) / processedData.length,
    color: "#ffc658" 
  }
]

export function AnalyticsPage() {
    const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // Try proxy first, fallback to direct API if needed
                let response: any;
                try {
                    response = await axios.get<AnalyticsResponse>('/api/analytics')
                } catch (proxyError) {
                    console.log('Proxy failed, trying direct API call...')
                    response = await axios.get<AnalyticsResponse>(
                        'https://apispectra.akashhalder.in/analytics',
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }
                    )
                }
                setAnalytics(response.data)
            } catch (error) {
                console.error("Failed to fetch analytics:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchAnalytics()
    }, [])
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Interactive <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Analytics</span> Dashboard
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Comprehensive insights into your advertising performance and budget optimization.
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Model Accuracy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <>
                                    <Skeleton className="h-8 w-24 mb-1" />
                                    <Skeleton className="h-4 w-32" />
                                </>
                            ) : (
                                <>
                                    <div className="text-2xl font-bold">{analytics?.metrics.model_accuracy.toFixed(2)}%</div>
                                    <p className="text-xs text-green-600">R² Score</p>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Mean Absolute Error</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <>
                                    <Skeleton className="h-8 w-20 mb-1" />
                                    <Skeleton className="h-4 w-28" />
                                </>
                            ) : (
                                <>
                                    <div className="text-2xl font-bold">{analytics?.metrics.mae.toFixed(2)}</div>
                                    <p className="text-xs text-blue-600">Average Error</p>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Mean Square Error</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <>
                                    <Skeleton className="h-8 w-16 mb-1" />
                                    <Skeleton className="h-4 w-24" />
                                </>
                            ) : (
                                <>
                                    <div className="text-2xl font-bold">{analytics?.metrics.mse.toFixed(0)}</div>
                                    <p className="text-xs text-purple-600">MSE Score</p>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Root MSE</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <>
                                    <Skeleton className="h-8 w-20 mb-1" />
                                    <Skeleton className="h-4 w-32" />
                                </>
                            ) : (
                                <>
                                    <div className="text-2xl font-bold">{analytics?.metrics.rmse.toFixed(2)}</div>
                                    <p className="text-xs text-orange-600">RMSE Score</p>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Sales vs Budget Trend */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales vs Total Budget</CardTitle>
                            <CardDescription>Relationship between budget and sales (First 50 records)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <ScatterChart data={processedData}>
                                    <XAxis dataKey="totalBudget" name="Total Budget" />
                                    <YAxis dataKey="sales" name="Sales" />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip formatter={(value, name) => [
                                        name === "sales" ? `₹${Number(value).toFixed(2)}` : `₹${Number(value).toFixed(2)}`,
                                        name === "sales" ? "Sales" : "Total Budget"
                                    ]} />
                                    <Scatter dataKey="sales" fill="#8884d8" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Channel Budget Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Budget Distribution by Channel</CardTitle>
                            <CardDescription>Average budget allocation across channels</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={budgetDistribution}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`₹${Number(value).toFixed(2)}`, 'Average Budget']} />
                                    <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Budget Distribution Pie */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Channel Budget Share</CardTitle>
                            <CardDescription>Distribution of average budget across channels</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={budgetDistribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {budgetDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `₹${Number(value).toFixed(2)}`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* TV vs Sales Correlation */}
                    <Card>
                        <CardHeader>
                            <CardTitle>TV Budget vs Sales</CardTitle>
                            <CardDescription>Correlation between TV advertising and sales</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={processedData.slice(0, 20)}>
                                    <XAxis dataKey="id" />
                                    <YAxis />
                                    <Tooltip formatter={(value, name) => [
                                        `₹${Number(value).toFixed(2)}`,
                                        name === 'tvBudget' ? 'TV Budget' : 'Sales'
                                    ]} />
                                    <Legend />
                                    <Area type="monotone" dataKey="tvBudget" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                    <Area type="monotone" dataKey="sales" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Dataset Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>Dataset Summary</CardTitle>
                        <CardDescription>Key statistics from the advertising dataset (First 50 records)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold mb-2">TV Advertising</h3>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Average Budget</p>
                                    <p className="text-xl font-bold">₹{(processedData.reduce((sum, item) => sum + item.tvBudget, 0) / processedData.length).toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground">Max: ₹{Math.max(...processedData.map(item => item.tvBudget)).toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground">Min: ₹{Math.min(...processedData.map(item => item.tvBudget)).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold mb-2">Radio Advertising</h3>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Average Budget</p>
                                    <p className="text-xl font-bold">₹{(processedData.reduce((sum, item) => sum + item.radioBudget, 0) / processedData.length).toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground">Max: ₹{Math.max(...processedData.map(item => item.radioBudget)).toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground">Min: ₹{Math.min(...processedData.map(item => item.radioBudget)).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold mb-2">Newspaper Advertising</h3>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Average Budget</p>
                                    <p className="text-xl font-bold">₹{(processedData.reduce((sum, item) => sum + item.newspaperBudget, 0) / processedData.length).toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground">Max: ₹{Math.max(...processedData.map(item => item.newspaperBudget)).toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground">Min: ₹{Math.min(...processedData.map(item => item.newspaperBudget)).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <h3 className="text-lg font-semibold mb-2">Sales Performance</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Average Sales</p>
                                    <p className="text-xl font-bold">₹{(processedData.reduce((sum, item) => sum + item.sales, 0) / processedData.length).toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Maximum Sales</p>
                                    <p className="text-xl font-bold">₹{Math.max(...processedData.map(item => item.sales)).toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Minimum Sales</p>
                                    <p className="text-xl font-bold">₹{Math.min(...processedData.map(item => item.sales)).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}