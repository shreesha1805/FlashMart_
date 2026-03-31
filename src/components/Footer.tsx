import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-extrabold">M</span>
              </div>
              <span className="font-heading font-bold text-lg text-foreground">MartFlash</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Instant delivery mart system — groceries, essentials & more in minutes.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/search" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/search" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/search" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/search" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/search" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/search" className="hover:text-foreground transition-colors">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/search" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/search" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/search" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          © 2026 FlashMart_. All rights reserved.. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
