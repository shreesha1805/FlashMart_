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
              <li className="hover:text-foreground cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-foreground cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-foreground cursor-pointer transition-colors">Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-foreground cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-foreground cursor-pointer transition-colors">FAQs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-foreground cursor-pointer transition-colors">Refund Policy</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          © 2026 MartFlash. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
