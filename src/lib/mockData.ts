
export type SensorReading = {
  id: string;
  timestamp: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  cropHealth: number;
  plotId: string;
};

export type Plot = {
  id: string;
  name: string;
  location: string;
  size: number;
  cropType: string;
  plantDate: string;
  lastReading?: SensorReading;
  status: 'healthy' | 'warning' | 'critical';
};

export type Crop = {
  id: string;
  name: string;
  scientificName: string;
  growthDuration: number;
  waterRequirement: 'low' | 'medium' | 'high';
  optimalTemperature: {
    min: number;
    max: number;
  };
  optimalHumidity: {
    min: number;
    max: number;
  };
  optimalSoilMoisture: {
    min: number;
    max: number;
  };
  description: string;
  imageUrl?: string;
};

export type Alert = {
  id: string;
  timestamp: string;
  type: 'temperature' | 'humidity' | 'soilMoisture' | 'cropHealth';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  plotId: string;
  plotName: string;
  status: 'active' | 'acknowledged' | 'resolved';
};

// Generate random readings within realistic ranges
function generateReading(plotId: string): SensorReading {
  const now = new Date();
  return {
    id: Math.random().toString(36).substring(7),
    timestamp: now.toISOString(),
    temperature: 20 + Math.random() * 15, // 20-35 °C
    humidity: 40 + Math.random() * 50, // 40-90 %
    soilMoisture: 20 + Math.random() * 60, // 20-80 %
    cropHealth: 50 + Math.random() * 50, // 50-100 (index)
    plotId: plotId
  };
}

// Generate readings for a specific date range
export function generateHistoricalData(
  plotId: string, 
  days: number = 30
): SensorReading[] {
  const data: SensorReading[] = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Create multiple readings per day
    for (let j = 0; j < 4; j++) {
      const hours = j * 6; // readings every 6 hours
      date.setHours(hours, 0, 0, 0);
      
      const reading = {
        id: `${plotId}-${i}-${j}`,
        timestamp: date.toISOString(),
        temperature: 20 + Math.random() * 15 + Math.sin(i/5) * 3, // Add some wave pattern
        humidity: 40 + Math.random() * 50 + Math.cos(i/7) * 5,
        soilMoisture: Math.max(20, 50 + Math.random() * 30 - (i % 5 === 0 ? 30 : 0)), // Drops every 5 days
        cropHealth: Math.min(100, 70 + Math.random() * 20 + (i < 10 ? i : 10)), // Gradually increases then plateaus
        plotId: plotId
      };
      
      data.push(reading);
    }
  }
  
  // Sort by date ascending
  return data.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

// Determine status based on sensor readings
function determineStatus(reading: SensorReading): 'healthy' | 'warning' | 'critical' {
  if (reading.soilMoisture < 30 || reading.temperature > 32 || reading.cropHealth < 60) {
    return 'critical';
  } else if (reading.soilMoisture < 40 || reading.temperature > 30 || reading.humidity < 50 || reading.cropHealth < 70) {
    return 'warning';
  }
  return 'healthy';
}

// Generate plots with their latest readings
export function generatePlots(count: number = 6): Plot[] {
  const cropTypes = ['Wheat', 'Rice', 'Corn', 'Soybeans', 'Cotton', 'Sugarcane'];
  const locations = ['North Field', 'South Field', 'East Field', 'West Field', 'Central Field'];
  
  return Array.from({ length: count }, (_, i) => {
    const plotId = `plot-${i + 1}`;
    const lastReading = generateReading(plotId);
    
    return {
      id: plotId,
      name: `Plot ${String.fromCharCode(65 + i)}${Math.floor(Math.random() * 20) + 1}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      size: Math.floor(Math.random() * 10) + 1, // 1-10 acres
      cropType: cropTypes[Math.floor(Math.random() * cropTypes.length)],
      plantDate: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 60))).toISOString(),
      lastReading,
      status: determineStatus(lastReading)
    };
  });
}

// Generate crop profiles
export function generateCrops(): Crop[] {
  return [
    {
      id: 'crop-1',
      name: 'Wheat',
      scientificName: 'Triticum aestivum',
      growthDuration: 120, // days
      waterRequirement: 'medium',
      optimalTemperature: { min: 15, max: 24 },
      optimalHumidity: { min: 45, max: 70 },
      optimalSoilMoisture: { min: 40, max: 60 },
      description: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food.'
    },
    {
      id: 'crop-2',
      name: 'Rice',
      scientificName: 'Oryza sativa',
      growthDuration: 150,
      waterRequirement: 'high',
      optimalTemperature: { min: 20, max: 30 },
      optimalHumidity: { min: 60, max: 80 },
      optimalSoilMoisture: { min: 70, max: 90 },
      description: 'Rice is the seed of the grass species Oryza sativa or less commonly Oryza glaberrima.'
    },
    {
      id: 'crop-3',
      name: 'Corn',
      scientificName: 'Zea mays',
      growthDuration: 90,
      waterRequirement: 'medium',
      optimalTemperature: { min: 18, max: 32 },
      optimalHumidity: { min: 50, max: 75 },
      optimalSoilMoisture: { min: 45, max: 65 },
      description: 'Maize, also known as corn, is a cereal grain first domesticated by indigenous peoples in southern Mexico.'
    },
    {
      id: 'crop-4',
      name: 'Soybeans',
      scientificName: 'Glycine max',
      growthDuration: 100,
      waterRequirement: 'medium',
      optimalTemperature: { min: 20, max: 30 },
      optimalHumidity: { min: 55, max: 70 },
      optimalSoilMoisture: { min: 50, max: 70 },
      description: 'The soybean or soya bean is a species of legume native to East Asia, widely grown for its edible bean.'
    },
    {
      id: 'crop-5',
      name: 'Cotton',
      scientificName: 'Gossypium hirsutum',
      growthDuration: 180,
      waterRequirement: 'medium',
      optimalTemperature: { min: 20, max: 35 },
      optimalHumidity: { min: 40, max: 60 },
      optimalSoilMoisture: { min: 35, max: 55 },
      description: 'Cotton is a soft, fluffy staple fiber that grows in a boll around the seeds of the cotton plants.'
    },
    {
      id: 'crop-6',
      name: 'Sugarcane',
      scientificName: 'Saccharum officinarum',
      growthDuration: 270,
      waterRequirement: 'high',
      optimalTemperature: { min: 24, max: 38 },
      optimalHumidity: { min: 60, max: 80 },
      optimalSoilMoisture: { min: 60, max: 80 },
      description: 'Sugarcane is a perennial grass of the genus Saccharum, primarily cultivated for its juice from which sugar is processed.'
    }
  ];
}

// Generate alerts
export function generateAlerts(plots: Plot[]): Alert[] {
  const alertTypes = ['temperature', 'humidity', 'soilMoisture', 'cropHealth'] as const;
  const severities = ['info', 'warning', 'critical'] as const;
  const statuses = ['active', 'acknowledged', 'resolved'] as const;
  
  const alerts: Alert[] = [];
  
  plots.forEach(plot => {
    // Create between 0 and 3 alerts for each plot
    const alertCount = Math.floor(Math.random() * 4);
    
    for (let i = 0; i < alertCount; i++) {
      const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const severity = severities[Math.floor(Math.random() * severities.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      let message = '';
      
      switch (type) {
        case 'temperature':
          message = `${severity === 'critical' ? 'Critically high' : 'Elevated'} temperature detected (${(25 + Math.random() * 10).toFixed(1)}°C)`;
          break;
        case 'humidity':
          message = `${severity === 'info' ? 'Low' : 'Critically low'} humidity levels detected (${(30 + Math.random() * 20).toFixed(1)}%)`;
          break;
        case 'soilMoisture':
          message = `${severity === 'critical' ? 'Critically low' : 'Low'} soil moisture detected (${(20 + Math.random() * 15).toFixed(1)}%)`;
          break;
        case 'cropHealth':
          message = `${severity === 'critical' ? 'Critical' : 'Declining'} crop health index detected (${(40 + Math.random() * 30).toFixed(1)})`;
          break;
      }
      
      alerts.push({
        id: `alert-${plot.id}-${i}`,
        timestamp: new Date(new Date().setHours(new Date().getHours() - Math.floor(Math.random() * 48))).toISOString(),
        type,
        severity,
        message,
        plotId: plot.id,
        plotName: plot.name,
        status
      });
    }
  });
  
  // Sort by timestamp, most recent first
  return alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

// Utility function to get summary data
export function getSummaryData(plots: Plot[]) {
  const totalPlots = plots.length;
  const healthyPlots = plots.filter(plot => plot.status === 'healthy').length;
  const warningPlots = plots.filter(plot => plot.status === 'warning').length;
  const criticalPlots = plots.filter(plot => plot.status === 'critical').length;
  
  let avgTemperature = 0;
  let avgHumidity = 0;
  let avgSoilMoisture = 0;
  let avgCropHealth = 0;
  
  plots.forEach(plot => {
    if (plot.lastReading) {
      avgTemperature += plot.lastReading.temperature;
      avgHumidity += plot.lastReading.humidity;
      avgSoilMoisture += plot.lastReading.soilMoisture;
      avgCropHealth += plot.lastReading.cropHealth;
    }
  });
  
  if (totalPlots > 0) {
    avgTemperature /= totalPlots;
    avgHumidity /= totalPlots;
    avgSoilMoisture /= totalPlots;
    avgCropHealth /= totalPlots;
  }
  
  return {
    totalPlots,
    healthyPlots,
    warningPlots,
    criticalPlots,
    avgTemperature,
    avgHumidity,
    avgSoilMoisture,
    avgCropHealth
  };
}
