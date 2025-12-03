import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import DashboardPage from "./pages/DashboardPage";
import Practice from "./pages/Practice";
import Rewards from "./pages/Rewards";
import Leaderboard from "./pages/Leaderboard";
import ParentCorner from "./pages/ParentCorner";
import ParentLogin from "./pages/ParentLogin";
import KidLogin from "./pages/KidLogin";
import KidHome from "./pages/KidHome";
import KidSession from "./pages/KidSession";
import ParentDashboardNew from "./pages/ParentDashboardNew";
import ParentSettings from "./pages/ParentSettings";
import RequireParent from "./components/RequireParent";
import NotFound from "./pages/NotFound";
import { AppProvider } from './context/AppContext';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/kid/login" element={<KidLogin />} />
              <Route path="/kid" element={<KidHome />} />
              <Route path="/kid/session" element={<KidSession />} />
              <Route path="/parent/login" element={<ParentLogin />} />
              <Route path="/parent" element={<RequireParent><ParentDashboardNew /></RequireParent>} />
              <Route path="/parent/settings" element={<RequireParent><ParentSettings /></RequireParent>} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/parent-corner" element={<ParentCorner />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/parent-login" element={<ParentLogin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
