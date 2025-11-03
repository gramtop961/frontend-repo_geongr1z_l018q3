import { Sprout, MapPin, Leaf, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur bg-white/60 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-green-600 text-white shadow-sm">
            <Sprout size={20} />
          </div>
          <span className="font-semibold tracking-tight text-slate-800 text-lg">AgriGuide</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="#weather" className="hover:text-slate-900 inline-flex items-center gap-1"><MapPin size={16}/>Weather</a>
          <a href="#advisory" className="hover:text-slate-900 inline-flex items-center gap-1"><Leaf size={16}/>Advisory</a>
        </nav>
        <button className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-slate-200 shadow-sm hover:shadow bg-white text-slate-700">
          <User size={16}/> Account
        </button>
      </div>
    </header>
  );
}
