import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"

// Mock data for demonstrations
const salesData = [
    { month: "Jan", sales: 65000, budget: 25000 },
    { month: "Feb", sales: 78000, budget: 28000 },
    { month: "Mar", sales: 92000, budget: 32000 },
    { month: "Apr", sales: 85000, budget: 30000 },
    { month: "May", sales: 98000, budget: 35000 },
    { month: "Jun", sales: 110000, budget: 38000 },
    { month: "Jul", sales: 125000, budget: 42000 },
    { month: "Aug", sales: 118000, budget: 40000 },
    { month: "Sep", sales: 135000, budget: 45000 },
    { month: "Oct", sales: 142000, budget: 48000 },
    { month: "Nov", sales: 155000, budget: 52000 },
    { month: "Dec", sales: 168000, budget: 55000 },
]

const channelData = [
    { channel: "Digital", budget: 45000, sales: 120000, roi: 267 },
    { channel: "TV", budget: 35000, sales: 85000, roi: 243 },
    { channel: "Radio", budget: 20000, sales: 45000, roi: 225 },
    { channel: "Influencer", budget: 25000, sales: 60000, roi: 240 },
    { channel: "Outdoor", budget: 15000, sales: 30000, roi: 200 },
]

const budgetDistribution = [
    { name: "Digital", value: 45000, color: "#8884d8" },
    { name: "TV", value: 35000, color: "#82ca9d" },
    { name: "Influencer", value: 25000, color: "#ffc658" },
    { name: "Radio", value: 20000, color: "#ff7300" },
    { name: "Outdoor", value: 15000, color: "#00ff88" },
]

const performanceData = [
    { quarter: "Q1", actualSales: 235000, predictedSales: 240000 },
    { quarter: "Q2", actualSales: 293000, predictedSales: 285000 },
    { quarter: "Q3", actualSales: 378000, predictedSales: 375000 },
    { quarter: "Q4", actualSales: 465000, predictedSales: 470000 },
]

export function AnalyticsPage() {
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
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$1,371,000</div>
                            <p className="text-xs text-green-600">+12.5% from last year</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$440,000</div>
                            <p className="text-xs text-blue-600">32.1% of sales</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Average ROI</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">235%</div>
                            <p className="text-xs text-green-600">+8.2% improvement</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Best Channel</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Digital</div>
                            <p className="text-xs text-muted-foreground">267% ROI</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Sales vs Budget Trend */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales vs Budget Trend</CardTitle>
                            <CardDescription>Monthly performance comparison</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={salesData}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name === 'sales' ? 'Sales' : 'Budget']} />
                                    <Legend />
                                    <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                    <Area type="monotone" dataKey="budget" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Channel Performance */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Channel ROI Performance</CardTitle>
                            <CardDescription>Return on investment by advertising channel</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={channelData}>
                                    <XAxis dataKey="channel" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`${value}%`, 'ROI']} />
                                    <Bar dataKey="roi" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Budget Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Budget Distribution</CardTitle>
                            <CardDescription>Current allocation across channels</CardDescription>
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
                                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Prediction Accuracy */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Prediction Accuracy</CardTitle>
                            <CardDescription>Actual vs predicted sales performance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="quarter" />
                                    <YAxis />
                                    <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name === 'actualSales' ? 'Actual Sales' : 'Predicted Sales']} />
                                    <Legend />
                                    <Line type="monotone" dataKey="actualSales" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="predictedSales" stroke="#82ca9d" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Channel Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle>Channel Performance Details</CardTitle>
                        <CardDescription>Comprehensive breakdown of each advertising channel</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-4 font-medium">Channel</th>
                                        <th className="text-right p-4 font-medium">Budget</th>
                                        <th className="text-right p-4 font-medium">Sales</th>
                                        <th className="text-right p-4 font-medium">ROI</th>
                                        <th className="text-right p-4 font-medium">Efficiency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {channelData.map((channel, index) => (
                                        <tr key={index} className="border-b hover:bg-muted/50">
                                            <td className="p-4 font-medium">{channel.channel}</td>
                                            <td className="p-4 text-right">${channel.budget.toLocaleString()}</td>
                                            <td className="p-4 text-right">${channel.sales.toLocaleString()}</td>
                                            <td className="p-4 text-right">
                                                <span className={`font-medium ${channel.roi > 250 ? 'text-green-600' : channel.roi > 225 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                    {channel.roi}%
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full"
                                                        style={{ width: `${Math.min((channel.roi / 300) * 100, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}