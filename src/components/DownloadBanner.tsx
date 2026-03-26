import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const DownloadBanner = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="gradient-primary rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-primary-foreground">
              Get the MartFlash App
            </h2>
            <p className="text-primary-foreground/80 max-w-md text-lg">
              Exclusive deals, real-time tracking, and even faster ordering — all in your pocket.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full font-semibold px-8">
                App Store
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full font-semibold px-8">
                Google Play
              </Button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-3xl bg-primary-foreground/10 flex items-center justify-center">
              <Smartphone className="w-16 h-16 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadBanner;
