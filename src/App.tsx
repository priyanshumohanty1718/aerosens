
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import HomePage from "@/pages/HomePage";
import AuthPage from "@/pages/AuthPage";
import DashboardPage from "@/pages/DashboardPage";
import PlotsPage from "@/pages/PlotsPage";
import CropsPage from "@/pages/CropsPage";
import AlertsPage from "@/pages/AlertsPage";
import HistoricalPage from "@/pages/HistoricalPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage defaultTab="login" />} />
          <Route path="/register" element={<AuthPage defaultTab="register" />} />
          
          {/* Dashboard routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/plots" element={<PlotsPage />} />
            <Route path="/crops" element={<CropsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/historical" element={<HistoricalPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
