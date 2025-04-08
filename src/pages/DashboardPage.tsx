
import { useState, useEffect } from "react";
import { Thermometer, Droplets, LineChart, Sprout, AlertTriangle } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { MetricsCard } from "@/components/ui/metrics-card";
import { SensorChart } from "@/components/ui/sensor-chart";
import { 
  generatePlots, 
  generateAlerts, 
  generateHistoricalData, 
  getSummaryData,
  type Plot,
  type Alert,
  type SensorReading
} from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [plots, setPlots] = useState<Plot[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<string>("");
  const [historicalData, setHistoricalData] = useState<SensorReading[]>([]);
  const { toast } = useToast();
  
  // Load mock data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock data
        const plotsData = generatePlots();
        const alertsData = generateAlerts(plotsData);
        
        setPlots(plotsData);
        setAlerts(alertsData);
        setSelectedPlot(plotsData[0].id);
        
        // Generate historical data for the first plot
        setHistoricalData(generateHistoricalData(plotsData[0].id));
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast({
          title: "Error loading data",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    loadData();
  }, [toast]);
  
  // When selected plot changes, update historical data
  useEffect(() => {
    if (selectedPlot) {
      setHistoricalData(generateHistoricalData(selectedPlot));
    }
  }, [selectedPlot]);
  
  const handlePlotChange = (plotId: string) => {
    setSelectedPlot(plotId);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg font-medium">Loading dashboard data...</p>
        </div>
      </div>
    );
  }
  
  // Get summary data for the dashboard
  const summary = getSummaryData(plots);
  
  // Get active alerts only
  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  
  // Find the currently selected plot
  const currentPlot = plots.find(plot => plot.id === selectedPlot);
  
  return (
    <div className="p-6 pb-16 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Monitor your crops and agricultural data in real-time
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">Export Data</Button>
          <Button>
            <Link to="/plots" className="flex items-center gap-2">
              View All Plots
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Average Temperature"
          value={`${summary.avgTemperature.toFixed(1)}°C`}
          icon={<Thermometer className="h-4 w-4" />}
          description="Last 24 hours"
          trend={{ value: 2.5, isPositive: true }}
        />
        <MetricsCard
          title="Average Humidity"
          value={`${summary.avgHumidity.toFixed(1)}%`}
          icon={<Droplets className="h-4 w-4" />}
          description="Last 24 hours"
          trend={{ value: 1.2, isPositive: false }}
        />
        <MetricsCard
          title="Average Soil Moisture"
          value={`${summary.avgSoilMoisture.toFixed(1)}%`}
          icon={<Sprout className="h-4 w-4" />}
          description="Last 24 hours"
          trend={{ value: 3.7, isPositive: false }}
        />
        <MetricsCard
          title="Average Crop Health"
          value={`${summary.avgCropHealth.toFixed(1)}`}
          icon={<LineChart className="h-4 w-4" />}
          description="Last 24 hours"
          trend={{ value: 0.8, isPositive: true }}
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Plot Selection and Chart */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Plot Performance</CardTitle>
                <div className="flex items-center space-x-2">
                  <select 
                    className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                    value={selectedPlot}
                    onChange={(e) => handlePlotChange(e.target.value)}
                  >
                    {plots.map((plot) => (
                      <option key={plot.id} value={plot.id}>
                        {plot.name} ({plot.cropType})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <CardDescription>
                {currentPlot && `${currentPlot.location} | ${currentPlot.size} acres | Planted: ${new Date(currentPlot.plantDate).toLocaleDateString()}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SensorChart 
                title=""
                data={historicalData} 
              />
            </CardContent>
          </Card>
          
          {/* Plot Status Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Plot Status Summary</CardTitle>
              <CardDescription>
                Current status of all monitored plots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {summary.healthyPlots}
                    </div>
                    <div className="text-sm font-medium text-green-800 dark:text-green-300">Healthy</div>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {summary.warningPlots}
                    </div>
                    <div className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Warning</div>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {summary.criticalPlots}
                    </div>
                    <div className="text-sm font-medium text-red-800 dark:text-red-300">Critical</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Recent Plot Updates</h4>
                  <div className="space-y-2">
                    {plots.slice(0, 5).map((plot) => (
                      <div key={plot.id} className="flex items-center justify-between p-3 bg-secondary/50 dark:bg-secondary/20 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <StatusBadge status={plot.status} />
                          <div>
                            <div className="font-medium">{plot.name}</div>
                            <div className="text-sm text-muted-foreground">{plot.cropType}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {plot.lastReading ? `${plot.lastReading.temperature.toFixed(1)}°C` : "N/A"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {plot.lastReading ? `${plot.lastReading.soilMoisture.toFixed(1)}% soil` : "No data"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <Link to="/plots">
                      <Button variant="outline" size="sm">View All Plots</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Active Alerts */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Active Alerts</CardTitle>
                <Link to="/alerts">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {activeAlerts.length > 0 ? (
                <div className="space-y-4">
                  {activeAlerts.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 dark:bg-secondary/20">
                      <div className={`mt-0.5 p-1.5 rounded-full ${
                        alert.severity === 'critical' 
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                          : alert.severity === 'warning'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      }`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-medium">{alert.plotName}</div>
                          <StatusBadge status={alert.severity} text={alert.severity} className="text-[10px]" />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            Resolve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
                    <CheckIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium mb-1">No Active Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    All your plots are currently operating within normal parameters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Weather Forecast */}
          <Card>
            <CardHeader>
              <CardTitle>Weather Forecast</CardTitle>
              <CardDescription>Next 5 days forecast</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Today */}
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div>
                    <div className="font-medium">Today</div>
                    <div className="text-sm text-muted-foreground">Mostly Sunny</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-6 w-6 text-yellow-500" />
                    <div className="text-lg font-bold">28°C</div>
                  </div>
                </div>
                
                {/* Next Days */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { day: "Tomorrow", weather: "Partly Cloudy", temp: "26°C", icon: <CloudSun className="h-5 w-5 text-blue-500" /> },
                    { day: "Wednesday", weather: "Scattered Showers", temp: "24°C", icon: <CloudRain className="h-5 w-5 text-blue-500" /> },
                    { day: "Thursday", weather: "Sunny", temp: "29°C", icon: <Sun className="h-5 w-5 text-yellow-500" /> },
                    { day: "Friday", weather: "Overcast", temp: "25°C", icon: <Cloud className="h-5 w-5 text-gray-500" /> }
                  ].map((day, i) => (
                    <div key={i} className="p-3 bg-secondary/50 dark:bg-secondary/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{day.day}</div>
                        {day.icon}
                      </div>
                      <div className="text-sm text-muted-foreground">{day.weather}</div>
                      <div className="text-lg font-bold mt-1">{day.temp}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button className="h-auto py-4 flex flex-col items-center">
                  <Thermometer className="h-5 w-5 mb-2" />
                  <span>Add Sensor</span>
                </Button>
                <Button className="h-auto py-4 flex flex-col items-center">
                  <Map className="h-5 w-5 mb-2" />
                  <span>New Plot</span>
                </Button>
                <Button className="h-auto py-4 flex flex-col items-center">
                  <FileText className="h-5 w-5 mb-2" />
                  <span>Reports</span>
                </Button>
                <Button className="h-auto py-4 flex flex-col items-center">
                  <Settings className="h-5 w-5 mb-2" />
                  <span>Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Icon Components
function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function Cloud(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}

function CloudRain(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" />
      <path d="M16 14v6" />
      <path d="M8 14v6" />
      <path d="M12 16v6" />
    </svg>
  )
}

function CloudSun(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="M20 12h2" />
      <path d="m19.07 4.93-1.41 1.41" />
      <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
      <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
    </svg>
  )
}

function FileText(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}

function Map(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  )
}

function Settings(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function Sun(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function Seedling(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 22c1.25-1.25 2.5-2.5 3.5-4" />
      <path d="M14 22a20.81 20.81 0 0 0 3-3" />
      <path d="M10 22a9.26 9.26 0 0 0 2-2" />
      <path d="M13.75 17A9.63 9.63 0 0 0 16 12a7.89 7.89 0 0 0-6-8 7.89 7.89 0 0 0-8 6 9.63 9.63 0 0 0 5 8.25" />
      <path d="M10 7.9A5.11 5.11 0 0 0 9 11a5 5 0 0 0 9.5 2" />
    </svg>
  )
}
