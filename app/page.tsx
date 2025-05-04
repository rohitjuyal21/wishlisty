import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Calendar,
  Gift,
  Mail,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/Landing/FeatureCard";
import { TestimonialCard } from "@/components/Landing/TestimonialCard";
import { Footer } from "@/components/Landing/Footer";

import { auth } from "@/auth";
import Header from "@/components/Landing/Header";

export default async function Home() {
  const session = await auth();
  return (
    <div className="relative z-10 min-h-screen overflow-hidden">
      {/* Header */}
      <Header session={session} />

      <section className="container mx-auto mt-[68px] px-4 py-20 md:py-32">
        <div className="absolute -top-[10vw] left-1/2 -z-10 h-[40vw] w-[100vw] -translate-x-1/2 rounded-full bg-blue-500 opacity-10 blur-3xl" />
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <button className="group relative inline-block cursor-pointer rounded-full bg-slate-800 p-px text-xs leading-6 font-semibold text-white no-underline shadow-2xl shadow-zinc-900">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative z-10 flex items-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/10">
              <span>Never forget your wishlist items again</span>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-blue-400/0 via-blue-400/90 to-blue-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>

          <h1 className="font-playfair text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            From wishlist to purchase,{" "}
            <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
              perfectly timed
            </span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
            Save products you want, set a reminder date, and receive an email
            when it's time to treat yourself.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group rounded-full" asChild>
              <Link href="/dashboard">
                Get Started{" "}
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 md:py-32">
        <div className="mb-16 text-center">
          <h2 className={`font-playfair mb-4 text-3xl font-bold md:text-4xl`}>
            Thoughtfully Crafted Features
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Designed to make your wishlist experience seamless and delightful
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<ShoppingCart />}
            title="Save Any Product"
            description="Easily save products from any online store with our browser extension or mobile app."
          />
          <FeatureCard
            icon={<Calendar />}
            title="Set Reminder Dates"
            description="Choose when you want to be reminded about each item in your wishlist."
          />
          <FeatureCard
            icon={<Mail />}
            title="Email Notifications"
            description="Receive elegant email reminders when it's time to revisit your saved items."
          />
          <FeatureCard
            icon={<Bell />}
            title="Smart Alerts"
            description="Get notified about price drops and limited-time offers for your wishlist items."
          />
          <FeatureCard
            icon={<Gift />}
            title="Share Wishlists"
            description="Create and share wishlists with friends and family for special occasions."
          />
          <FeatureCard
            icon={<ArrowRight />}
            title="One-Click Purchase"
            description="Go directly to the product page when you're ready to make your purchase."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="to-muted/60 border-y bg-gradient-to-br from-transparent py-20 md:py-32"
      >
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className={`font-playfair mb-4 text-3xl font-bold md:text-4xl`}>
              How Wishlisty Works
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Three simple steps to never miss out on the products you want
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="to-muted/60 relative rounded-2xl border bg-gradient-to-br from-transparent p-6 transition-colors hover:border-blue-500/50">
              <div className="absolute -top-5 -left-5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 font-bold">
                1
              </div>
              <h3 className="mt-2 mb-4 text-xl font-bold">Save Products</h3>
              <p className="text-muted-foreground">
                Find something you love but not ready to buy? Add it to your
                Wishlisty with our browser extension or app.
              </p>
            </div>
            <div className="to-muted/60 relative rounded-2xl border bg-gradient-to-br from-transparent p-6 transition-colors hover:border-blue-500/50">
              {" "}
              <div className="absolute -top-5 -left-5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 font-bold">
                2
              </div>
              <h3 className="mt-2 mb-4 text-xl font-bold">Set a Reminder</h3>
              <p className="text-muted-foreground">
                Choose when you want to be reminded about the product - next
                payday, special occasion, or any date you choose.
              </p>
            </div>
            <div className="to-muted/60 relative rounded-2xl border bg-gradient-to-br from-transparent p-6 transition-colors hover:border-blue-500/50">
              <div className="absolute -top-5 -left-5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 font-bold">
                3
              </div>
              <h3 className="mt-2 mb-4 text-xl font-bold">Get Reminded</h3>
              <p className="text-muted-foreground">
                Receive a beautifully designed email reminder on your chosen
                date with all the product details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mb-16 text-center">
          <h2 className={`font-playfair mb-4 text-3xl font-bold md:text-4xl`}>
            Loved by Thoughtful Shoppers
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Join thousands of users who have transformed their shopping
            experience
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <TestimonialCard
            quote="Wishlisty helped me stop impulse buying. Now I save items and if I still want them after a month, I know it's worth it."
            author="Alex Morgan"
            role="Designer"
          />
          <TestimonialCard
            quote="I use Wishlisty to plan all my gift shopping. Setting reminders before birthdays has been a game-changer."
            author="Jamie Chen"
            role="Marketing Manager"
          />
          <TestimonialCard
            quote="The price drop alerts have saved me hundreds of dollars. I just wait for the notification and then make my purchase."
            author="Sam Taylor"
            role="Software Engineer"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="to-muted/60 border-t bg-gradient-to-br from-transparent py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`font-playfair mb-6 text-3xl font-bold md:text-4xl`}>
            Ready to transform your wishlist experience?
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
            Join Wishlisty today and never forget the products you truly want.
          </p>
          <Button size="lg">Get Started for Free</Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
