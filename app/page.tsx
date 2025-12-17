"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Users, TrendingUp, Calendar, Building2, Shield, Zap } from "lucide-react"

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    const tryPlay = () => {
      const playPromise = vid.play()
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          /* ignore autoplay rejection; overlay already covers */
        })
      }
    }

    tryPlay()

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        tryPlay()
      }
    }

    document.addEventListener("visibilitychange", onVisibility)
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-xl ${
          scrolled
            ? "bg-slate-950/80 shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
            : "bg-slate-950/40 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-white leading-tight">Deal Board</span>
                  <span className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">CRM Platform</span>
                </div>
              </Link>
               <div className="hidden md:flex items-center gap-6">
                <Link
                  href="#features"
                   className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#solutions"
                   className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
                >
                  Solutions
                </Link>
                <Link
                  href="#pricing"
                   className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-black/40 px-5 rounded-full"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Hero background video */}
        <div className="absolute inset-0 bg-background" aria-hidden="true" />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance mb-6 leading-tight text-white">
              Manage customer relationships that drive{" "}
              <span className="text-primary">real growth</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-10 max-w-3xl mx-auto text-pretty">
              Deal Board is the modern CRM platform that helps teams track deals, manage customers, and close more sales
              with intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 h-12 rounded-xl shadow-lg shadow-black/40"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground text-sm mb-8">Trusted by thousands of growing teams</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            <div className="text-2xl font-bold">Company A</div>
            <div className="text-2xl font-bold">Company B</div>
            <div className="text-2xl font-bold">Company C</div>
            <div className="text-2xl font-bold">Company D</div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Users className="w-4 h-4" />
                <span>Customer Management</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                Know your customers inside and out
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Build comprehensive customer profiles with contact information, interaction history, and engagement
                insights. Never miss an opportunity to connect.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    360-degree customer view with complete interaction history
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Segment and filter customers for targeted outreach</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Track customer status and lifecycle stages</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 flex items-center justify-center">
                <div className="w-full h-full bg-card rounded-xl shadow-2xl p-6 flex items-center justify-center">
                  <Users className="w-24 h-24 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="relative order-2 md:order-1">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 p-8 flex items-center justify-center">
                <div className="w-full h-full bg-card rounded-xl shadow-2xl p-6 flex items-center justify-center">
                  <TrendingUp className="w-24 h-24 text-accent" />
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>Deal Pipeline</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                Move deals forward with confidence
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Visualize your sales pipeline with intuitive Kanban boards. Track every deal stage, identify
                bottlenecks, and forecast revenue with precision.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Drag-and-drop pipeline management</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Customizable deal stages and workflows</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Real-time revenue forecasting</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Calendar className="w-4 h-4" />
                <span>Task Automation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                Never miss a follow-up again
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Automate repetitive tasks and set smart reminders. Focus on building relationships while Deal Board
                handles the administrative work.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Automated task creation and assignment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Smart reminders and notifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Activity tracking and reporting</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 flex items-center justify-center">
                <div className="w-full h-full bg-card rounded-xl shadow-2xl p-6 flex items-center justify-center">
                  <Calendar className="w-24 h-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built for modern teams</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to scale your business, from startups to enterprise
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-department</h3>
              <p className="text-muted-foreground leading-relaxed">
                Manage multiple businesses or clients from a single account. Switch contexts seamlessly.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Enterprise security</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bank-level encryption, role-based access control, and comprehensive audit logs.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning fast</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built on modern infrastructure for instant loading and real-time updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
            Ready to close more deals?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of teams using Deal Board to grow their business
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-base px-8 h-12 rounded-xl">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base px-8 h-12 rounded-xl bg-transparent">
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent rounded-xl blur-sm opacity-40"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight leading-tight">Deal Board</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">CRM Platform</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Modern CRM for modern teams</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#solutions" className="hover:text-foreground transition-colors">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Deal Board. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
