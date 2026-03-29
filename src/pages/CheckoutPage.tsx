import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Smartphone, Building2, Wallet, Banknote, ChevronRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

type PaymentMethod = "upi" | "card" | "netbanking" | "wallet" | "cod";

const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "upi", label: "UPI", icon: <Smartphone className="w-5 h-5" />, desc: "Google Pay, PhonePe, Paytm" },
  { id: "card", label: "Credit / Debit Card", icon: <CreditCard className="w-5 h-5" />, desc: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net Banking", icon: <Building2 className="w-5 h-5" />, desc: "All major banks supported" },
  { id: "wallet", label: "Wallets", icon: <Wallet className="w-5 h-5" />, desc: "Paytm, Amazon Pay, Mobikwik" },
  { id: "cod", label: "Cash on Delivery", icon: <Banknote className="w-5 h-5" />, desc: "Pay when you receive" },
];

const banks = ["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB", "BOB", "Yes Bank"];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [step, setStep] = useState<"address" | "payment" | "confirm">("address");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [processing, setProcessing] = useState(false);

  const [address, setAddress] = useState({ name: "", phone: "", line1: "", line2: "", city: "", pincode: "" });
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [selectedBank, setSelectedBank] = useState("");

  const deliveryFee = totalPrice > 299 ? 0 : 29;
  const discount = Math.round(items.reduce((s, i) => s + (i.oldPrice - i.price) * i.quantity, 0));
  const grandTotal = totalPrice + deliveryFee;

  const isAddressValid = address.name && address.phone.length >= 10 && address.line1 && address.city && address.pincode.length >= 5;

  const isPaymentValid = () => {
    if (!selectedPayment) return false;
    if (selectedPayment === "upi") return upiId.includes("@");
    if (selectedPayment === "card") return cardDetails.number.length >= 16 && cardDetails.expiry && cardDetails.cvv.length >= 3 && cardDetails.name;
    if (selectedPayment === "netbanking") return !!selectedBank;
    return true;
  };

  const handlePlaceOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("confirm");
      clearCart();
    }, 2000);
  };

  if (items.length === 0 && step !== "confirm") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-6xl">🛒</div>
        <h2 className="font-heading font-bold text-xl text-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground text-sm text-center">Add items to your cart before checkout</p>
        <Button className="gradient-primary text-primary-foreground rounded-full" onClick={() => navigate("/")}>Browse Products</Button>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-foreground">Order Placed!</h2>
        <p className="text-muted-foreground text-sm max-w-xs">Your order has been placed successfully. You'll receive a confirmation shortly.</p>
        <div className="bg-card border border-border rounded-xl p-4 w-full max-w-xs space-y-2 mt-2">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Order ID</span><span className="font-semibold text-foreground">#{Math.random().toString(36).slice(2, 10).toUpperCase()}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Amount</span><span className="font-semibold text-foreground">₹{grandTotal}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Payment</span><span className="font-semibold text-foreground capitalize">{selectedPayment === "cod" ? "Cash on Delivery" : selectedPayment?.toUpperCase()}</span></div>
          <div className="flex items-center gap-1.5 text-xs text-primary pt-1"><Clock className="w-3.5 h-3.5" /> Estimated delivery in 10-15 minutes</div>
        </div>
        <div className="flex gap-3 mt-4">
          <Button className="gradient-primary text-primary-foreground rounded-full flex-1" onClick={() => navigate(`/track-order?id=${Math.random().toString(36).slice(2, 10).toUpperCase()}`)}>
            Track Order
          </Button>
          <Button variant="outline" className="rounded-full" onClick={() => navigate("/")}>Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="container mx-auto flex items-center gap-3">
          <button onClick={() => step === "payment" ? setStep("address") : navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-bold text-lg text-foreground">Checkout</h1>
          <div className="ml-auto flex gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${step === "address" || step === "payment" ? "bg-primary" : "bg-muted"}`} />
            <span className={`w-2.5 h-2.5 rounded-full ${step === "payment" ? "bg-primary" : "bg-muted"}`} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-lg space-y-6">
        {/* Address Step */}
        {step === "address" && (
          <>
            <div>
              <h2 className="font-heading font-bold text-lg text-foreground flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" /> Delivery Address
              </h2>
              <div className="space-y-3">
                <Input placeholder="Full Name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} className="rounded-xl bg-muted border-0" />
                <Input placeholder="Phone Number" type="tel" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="rounded-xl bg-muted border-0" />
                <Input placeholder="House / Flat / Block No." value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} className="rounded-xl bg-muted border-0" />
                <Input placeholder="Street / Area / Landmark (optional)" value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} className="rounded-xl bg-muted border-0" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="rounded-xl bg-muted border-0" />
                  <Input placeholder="Pincode" type="tel" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className="rounded-xl bg-muted border-0" />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h2 className="font-heading font-bold text-lg text-foreground mb-3">Order Summary</h2>
              <div className="bg-card border border-border rounded-xl divide-y divide-border">
                {items.map((item) => (
                  <div key={item.name} className="flex items-center gap-3 px-4 py-3">
                    <span className="text-2xl">{item.img}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.weight} × {item.quantity}</p>
                    </div>
                    <span className="font-heading font-bold text-sm text-foreground">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Payment Step */}
        {step === "payment" && (
          <>
            <div>
              <h2 className="font-heading font-bold text-lg text-foreground flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary" /> Payment Method
              </h2>
              <div className="space-y-2">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setSelectedPayment(pm.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                      selectedPayment === pm.id
                        ? "border-primary bg-accent shadow-sm"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      selectedPayment === pm.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {pm.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-heading font-semibold text-sm text-foreground">{pm.label}</p>
                      <p className="text-xs text-muted-foreground">{pm.desc}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${selectedPayment === pm.id ? "text-primary" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            {selectedPayment === "upi" && (
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <p className="font-heading font-semibold text-sm text-foreground">Enter UPI ID</p>
                <Input placeholder="example@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="rounded-xl bg-muted border-0" />
                <div className="flex gap-2 flex-wrap">
                  {["@ybl", "@paytm", "@oksbi", "@okaxis"].map((suffix) => (
                    <button key={suffix} onClick={() => setUpiId((prev) => prev.split("@")[0] + suffix)} className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                      {suffix}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedPayment === "card" && (
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <p className="font-heading font-semibold text-sm text-foreground">Card Details</p>
                <Input placeholder="Card Number" type="tel" maxLength={19} value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value.replace(/\D/g, "") })} className="rounded-xl bg-muted border-0" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="MM/YY" maxLength={5} value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} className="rounded-xl bg-muted border-0" />
                  <Input placeholder="CVV" type="password" maxLength={4} value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "") })} className="rounded-xl bg-muted border-0" />
                </div>
                <Input placeholder="Name on Card" value={cardDetails.name} onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} className="rounded-xl bg-muted border-0" />
              </div>
            )}

            {selectedPayment === "netbanking" && (
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <p className="font-heading font-semibold text-sm text-foreground">Select Bank</p>
                <div className="grid grid-cols-2 gap-2">
                  {banks.map((bank) => (
                    <button
                      key={bank}
                      onClick={() => setSelectedBank(bank)}
                      className={`p-3 rounded-xl text-sm font-medium border transition-all ${
                        selectedBank === bank
                          ? "border-primary bg-accent text-primary"
                          : "border-border bg-muted text-foreground hover:border-primary/40"
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedPayment === "wallet" && (
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-sm text-muted-foreground">You'll be redirected to complete payment via your selected wallet.</p>
              </div>
            )}

            {selectedPayment === "cod" && (
              <div className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
                <Banknote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground">Please keep exact change of ₹{grandTotal} ready at the time of delivery.</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Price Breakdown */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Item Total ({totalItems} items)</span><span className="text-foreground">₹{totalPrice}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery Fee</span><span className={deliveryFee === 0 ? "text-primary font-medium" : "text-foreground"}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Discount</span><span className="text-primary font-medium">-₹{discount}</span></div>
          <div className="border-t border-border pt-2 flex justify-between"><span className="font-heading font-bold text-foreground">Grand Total</span><span className="font-heading font-bold text-lg text-foreground">₹{grandTotal}</span></div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
          <ShieldCheck className="w-4 h-4 text-primary" /> 100% Secure Payments
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border p-4">
        <div className="container mx-auto max-w-lg">
          {step === "address" ? (
            <Button disabled={!isAddressValid} className="w-full gradient-primary text-primary-foreground border-0 rounded-full font-semibold h-12 text-base disabled:opacity-50" onClick={() => setStep("payment")}>
              Continue to Payment — ₹{grandTotal}
            </Button>
          ) : (
            <Button disabled={!isPaymentValid() || processing} className="w-full gradient-primary text-primary-foreground border-0 rounded-full font-semibold h-12 text-base disabled:opacity-50" onClick={handlePlaceOrder}>
              {processing ? "Processing..." : `Place Order — ₹${grandTotal}`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
