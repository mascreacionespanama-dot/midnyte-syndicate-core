import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Manifesto from "./pages/Manifesto.tsx";
import Shipping from "./pages/Shipping.tsx";
import Shop from "./pages/Shop.tsx";
import Drop01 from "./pages/Drop01.tsx";
import Drop02 from "./pages/Drop02.tsx";
import Archive from "./pages/Archive.tsx";
import FutureDrops from "./pages/FutureDrops.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:handle" element={<ProductDetail />} />
        <Route path="/drops/01" element={<Drop01 />} />
        <Route path="/drops/02" element={<Drop02 />} />
        <Route path="/drops/archive" element={<Archive />} />
        <Route path="/future-drops" element={<FutureDrops />} />
        <Route path="/about" element={<About />} />
        <Route path="/manifesto" element={<Manifesto />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
