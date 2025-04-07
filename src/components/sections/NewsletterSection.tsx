
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    // In a real app, would handle newsletter signup
    alert(`Thanks for signing up with ${email}! We'll be in touch soon.`);
  };

  return (
    <section className="py-12 container-padding scroll-section">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
        <p className="text-muted-foreground mb-6">
          Subscribe to our newsletter for the latest updates and agricultural insights.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-2 rounded-xl border border-input shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="gradient">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
