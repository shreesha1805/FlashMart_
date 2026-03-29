import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, Clock, MapPin, Navigation, CheckCircle2, Package, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const deliveryIcon = new L.DivIcon({
  html: `<div style="background: hsl(142, 76%, 36%); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>
  </div>`,
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const homeIcon = new L.DivIcon({
  html: `<div style="background: hsl(346, 77%, 50%); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  </div>`,
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const storeIcon = new L.DivIcon({
  html: `<div style="background: hsl(220, 70%, 50%); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/></svg>
  </div>`,
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

// Simulated route points (store → delivery location)
const storeLocation: [number, number] = [28.6139, 77.2090]; // Delhi center
const homeLocation: [number, number] = [28.6280, 77.2195];

const routePoints: [number, number][] = [
  storeLocation,
  [28.6155, 77.2105],
  [28.6170, 77.2120],
  [28.6190, 77.2135],
  [28.6210, 77.2150],
  [28.6230, 77.2165],
  [28.6255, 77.2175],
  [28.6270, 77.2185],
  homeLocation,
];

const trackingSteps = [
  { label: "Order Confirmed", icon: CheckCircle2, time: "2 min ago" },
  { label: "Preparing Order", icon: Package, time: "1 min ago" },
  { label: "Partner Assigned", icon: Bike, time: "Just now" },
  { label: "On the Way", icon: Navigation, time: "~8 min" },
  { label: "Delivered", icon: MapPin, time: "" },
];

function AnimatedMarker({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  const [index, setIndex] = useState(0);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = Math.min(prev + 1, positions.length - 1);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [positions.length]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(positions[index]);
    }
    map.panTo(positions[index], { animate: true, duration: 1 });
  }, [index, map, positions]);

  return (
    <Marker position={positions[index]} icon={deliveryIcon} ref={markerRef}>
      <Popup>🚴 Delivery Partner</Popup>
    </Marker>
  );
}

const OrderTrackingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id") || "XXXX";
  const [currentStep, setCurrentStep] = useState(2);
  const [eta, setEta] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      setEta((prev) => Math.max(prev - 2, 0));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
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

      {/* Map */}
      <div className="flex-1 relative" style={{ minHeight: "45vh" }}>
        <MapContainer
          center={[28.6200, 77.2140]}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-full"
          style={{ height: "45vh" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline
            positions={routePoints}
            pathOptions={{ color: "hsl(142, 76%, 36%)", weight: 4, opacity: 0.7, dashArray: "8, 8" }}
          />
          <AnimatedMarker positions={routePoints} />
          <Marker position={homeLocation} icon={homeIcon}>
            <Popup>📍 Your Location</Popup>
          </Marker>
          <Marker position={storeLocation} icon={storeIcon}>
            <Popup>🏪 MartFlash Store</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-card border-t border-border rounded-t-3xl -mt-4 relative z-[500] px-4 pt-5 pb-6 space-y-5">
        {/* Delivery Partner Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            R
          </div>
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

        {/* Tracking Steps */}
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
