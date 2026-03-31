import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, Clock, MapPin, Navigation, CheckCircle2, Package, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";

const storeLocation = { lat: 28.6139, lng: 77.2090 };
const homeLocation = { lat: 28.6280, lng: 77.2195 };

const routePoints = [
  storeLocation,
  { lat: 28.6155, lng: 77.2105 },
  { lat: 28.6170, lng: 77.2120 },
  { lat: 28.6190, lng: 77.2135 },
  { lat: 28.6210, lng: 77.2150 },
  { lat: 28.6230, lng: 77.2165 },
  { lat: 28.6255, lng: 77.2175 },
  { lat: 28.6270, lng: 77.2185 },
  homeLocation,
];

const trackingSteps = [
  { label: "Order Confirmed", icon: CheckCircle2, time: "2 min ago" },
  { label: "Preparing Order", icon: Package, time: "1 min ago" },
  { label: "Partner Assigned", icon: Bike, time: "Just now" },
  { label: "On the Way", icon: Navigation, time: "~8 min" },
  { label: "Delivered", icon: MapPin, time: "" },
];

function loadLeaflet(): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).L) {
      resolve((window as any).L);
      return;
    }
    // CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }
    // JS
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.onload = () => resolve((window as any).L);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function LeafletMap({ driverIndex }: { driverIndex: number }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const driverMarkerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadLeaflet().then((L) => {
      if (cancelled || !mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current).setView([28.6200, 77.2140], 14);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OSM',
      }).addTo(map);

      const latlngs = routePoints.map((p) => [p.lat, p.lng]);
      L.polyline(latlngs, { color: "#16a34a", weight: 4, opacity: 0.7, dashArray: "8, 8" }).addTo(map);

      const makeIcon = (emoji: string, bg: string) =>
        L.divIcon({
          html: `<div style="background:${bg};width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-size:16px;">${emoji}</div>`,
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

      L.marker([storeLocation.lat, storeLocation.lng], { icon: makeIcon("🏪", "#3b82f6") }).addTo(map).bindPopup("L.marker([storeLocation.lat, storeLocation.lng], { icon: makeIcon("🏪", "#3b82f6") }).addTo(map).bindPopup("FlashMart_ Store");");
      L.marker([homeLocation.lat, homeLocation.lng], { icon: makeIcon("🏠", "#ef4444") }).addTo(map).bindPopup("Your Location");

      const driverIcon = L.divIcon({
        html: `<div style="background:#16a34a;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-size:18px;">🚴</div>`,
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });
      driverMarkerRef.current = L.marker([routePoints[0].lat, routePoints[0].lng], { icon: driverIcon }).addTo(map).bindPopup("Delivery Partner");

      setTimeout(() => map.invalidateSize(), 200);
      setReady(true);
    });

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (ready && driverMarkerRef.current && mapInstanceRef.current) {
      const pos = routePoints[driverIndex];
      driverMarkerRef.current.setLatLng([pos.lat, pos.lng]);
      mapInstanceRef.current.panTo([pos.lat, pos.lng], { animate: true, duration: 1 });
    }
  }, [driverIndex, ready]);

  return <div ref={mapRef} className="w-full h-full" />;
}

const OrderTrackingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id") || "XXXX";
  const [currentStep, setCurrentStep] = useState(2);
  const [eta, setEta] = useState(10);
  const [driverIndex, setDriverIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDriverIndex((prev) => Math.min(prev + 1, routePoints.length - 1));
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      setEta((prev) => Math.max(prev - 2, 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-[1000] bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="container mx-auto flex items-center gap-3">
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-heading font-bold text-base text-foreground">Live Tracking</h1>
            <p className="text-xs text-muted-foreground">Order #{orderId}</p>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">{eta > 0 ? `${eta} min` : "Arriving"}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative" style={{ minHeight: "45vh" }}>
        <LeafletMap driverIndex={driverIndex} />
      </div>

      <div className="bg-card border-t border-border rounded-t-3xl -mt-4 relative z-[500] px-4 pt-5 pb-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">R</div>
          <div className="flex-1">
            <p className="font-heading font-bold text-foreground">Rahul Kumar</p>
            <p className="text-xs text-muted-foreground">Delivery Partner · ⭐ 4.8</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-0">
          {trackingSteps.map((step, i) => {
            const Icon = step.icon;
            const isComplete = i <= currentStep;
            const isCurrent = i === currentStep;
            return (
              <div key={step.label} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isComplete ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  } ${isCurrent ? "ring-2 ring-primary/30 ring-offset-2 ring-offset-card" : ""}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {i < trackingSteps.length - 1 && (
                    <div className={`w-0.5 h-6 ${isComplete ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
                <div className="pt-1">
                  <p className={`text-sm font-medium ${isComplete ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                  {step.time && <p className="text-xs text-muted-foreground">{step.time}</p>}
                </div>
              </div>
            );
          })}
        </div>

        <Button className="w-full gradient-primary text-primary-foreground border-0 rounded-full font-semibold h-11" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
