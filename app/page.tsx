import MarketplaceHero from '@/components/MarketplaceHero';
import FeaturedHostels from '@/components/FeaturedHostels';
import StoriesSection from '@/components/StoriesSection';
import CommunitiesSection from '@/components/CommunitiesSection';
import MapComponent from '@/components/MapComponent';
import { Shield, Award, Wifi, Users, ArrowRight, Home, CheckCircle, Search, UserCircle, ShieldCheck, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Premium Hero with Role Selection */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
            <span className="text-xs font-black uppercase tracking-widest text-dark-light">The Future of Campus Housing</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-dark mb-8 tracking-tighter leading-[0.9]">
            Your Journey <br /> Starts <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Right Here.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-dark-light font-medium mb-16 leading-relaxed">
            Choose your portal to begin. Whether you're finding a home, managing a block, or governing the platform, we've got you covered.
          </p>

          {/* Core Role Entry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {/* Student Card */}
            <Link href="/auth/login?role=Student" className="group">
              <div className="h-full p-10 bg-white rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden group-hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-all">
                  <UserCircle size={40} strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black text-dark mb-4 tracking-tight">I'm a Student</h3>
                <p className="text-dark-light font-medium mb-8">Browse verified hostels, take virtual tours, and apply in seconds.</p>
                <div className="inline-flex items-center gap-2 font-black text-primary uppercase tracking-widest text-sm">
                  Find Hostels <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            {/* Warden Card */}
            <Link href="/auth/login?role=Warden" className="group">
              <div className="h-full p-10 bg-white rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden group-hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-[2rem] flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-all">
                  <ShieldCheck size={40} strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black text-dark mb-4 tracking-tight">I'm a Warden</h3>
                <p className="text-dark-light font-medium mb-8">Manage student applications, mess menus, and block notices effortlessly.</p>
                <div className="inline-flex items-center gap-2 font-black text-secondary uppercase tracking-widest text-sm">
                  Warden Portal <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            {/* Admin Card */}
            <Link href="/auth/login?role=Admin" className="group">
              <div className="h-full p-10 bg-white rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden group-hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="w-20 h-20 bg-accent/10 text-accent rounded-[2rem] flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-all">
                  <LayoutDashboard size={40} strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black text-dark mb-4 tracking-tight">Platform Admin</h3>
                <p className="text-dark-light font-medium mb-8">Oversee all hostels, verify new registrations, and manage system health.</p>
                <div className="inline-flex items-center gap-2 font-black text-accent uppercase tracking-widest text-sm">
                  Console Access <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Hostels with Preview Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">Top Picks</span>
              <h2 className="text-4xl md:text-6xl font-black text-dark tracking-tight">Browse Premium <span className="text-primary italic">Live</span> Blocks</h2>
            </div>
            <Link href="/search" className="px-10 py-5 bg-dark text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-primary transition-all shadow-xl flex items-center gap-3">
              Explore All <Search size={20} />
            </Link>
          </div>
          <FeaturedHostels />
        </div>
      </section>

      {/* Map Preview Section - Placeholder for Google Maps */}
      <section className="py-24 px-6 bg-light overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-dark mb-4">Hostels Near You</h2>
          <p className="text-dark-light font-medium">Use our interactive map to find the perfect location.</p>
        </div>
        <div className="max-w-7xl mx-auto bg-white rounded-[4rem] h-[600px] shadow-2xl border-8 border-white relative overflow-hidden group cursor-pointer">
          <MapComponent />
        </div>
      </section>

      {/* Social Communities */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <StoriesSection />
        <CommunitiesSection />
      </div>

      {/* How It Works with Premium Icons */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-4 tracking-tight leading-tight">
              Finding a hostel should be <span className="text-primary italic">simple.</span>
            </h2>
            <p className="text-xl text-dark-light font-medium">Three easy steps to your new campus life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {[
              {
                step: '01',
                icon: Search,
                title: 'Search & Compare',
                desc: 'Browse hundreds of verified hostels with real student reviews and high-quality virtual tours.',
                color: 'bg-primary'
              },
              {
                step: '02',
                icon: Shield,
                title: 'Apply Securely',
                desc: 'Submit your application directly to the warden. Safe, digital, and transparent process.',
                color: 'bg-secondary'
              },
              {
                step: '03',
                icon: Home,
                title: 'Move In',
                desc: 'Once accepted, receive your digital credentials and move into your new home. Easy as that.',
                color: 'bg-accent'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className={`w-28 h-28 ${item.color} text-white rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500 rotate-3 group-hover:rotate-0`}>
                  <item.icon size={48} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black text-dark mb-4">{item.title}</h3>
                <p className="text-dark-light font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Meta Stats */}
      <section className="py-20 px-6 border-t border-gray-100 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="space-y-4">
            <span className="font-black text-3xl tracking-tighter text-dark">HOSTEL<span className="text-primary">HUB</span>.</span>
            <p className="text-dark-light font-medium text-sm">Ensuring student safety and comfort <br /> across 500+ verified campuses.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 font-black text-xs tracking-[0.2em] uppercase text-dark-light/50">
            <div className="flex flex-col gap-2">
              <span className="text-dark">ISO 9001</span>
              <span>Quality Certified</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-dark">256-BIT</span>
              <span>AES Encryption</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-dark">24/7 SUPPORT</span>
              <span>Always Active</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
