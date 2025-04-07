
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Thermometer, Cloud } from "lucide-react";
import { WaterDropIcon } from "@/components/icons/WaterDropIcon";
import { LeafIcon } from "@/components/icons/LeafIcon";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 container-padding scroll-section scroll-section-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-slide-up">
          <h1 className="text-gradient font-bold tracking-tight">
            Smart Crop Monitoring System for Modern Agriculture
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            AeroSense simulates real-time agricultural data to help farmers, researchers, and students monitor crop conditions without expensive IoT hardware.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button size="lg" variant="gradient" className="w-full sm:w-auto shadow-lg">
                Get Started
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative h-[450px]">
          <div className="relative h-[400px] w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80" 
              alt="Crop field" 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-effect p-4 rounded-xl">
                  <div className="text-primary font-semibold flex items-center">
                    <Thermometer className="h-4 w-4 mr-1.5" /> Temperature
                  </div>
                  <div className="text-2xl font-bold">27.5°C</div>
                </div>
                <div className="glass-effect p-4 rounded-xl">
                  <div className="text-primary font-semibold flex items-center">
                    <Cloud className="h-4 w-4 mr-1.5" /> Humidity
                  </div>
                  <div className="text-2xl font-bold">68%</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Soil Moisture - Fixed position with animation */}
          <div className="floating-card top-0 right-0 z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <WaterDropIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-sm font-medium">Soil Moisture</div>
                <div className="text-lg font-bold">58%</div>
              </div>
            </div>
          </div>
          
          {/* Crop Health - Fixed position with animation */}
          <div className="floating-card bottom-0 left-0 z-10" style={{animationDelay: "1.5s"}}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <LeafIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-medium">Crop Health</div>
                <div className="text-lg font-bold">92%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
