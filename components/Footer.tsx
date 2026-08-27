import Link from 'next/link';
import { FaGithub, FaLinkedin, FaFacebook, FaKaggle, FaMedium, FaHeart } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';

const quickLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blogs',    href: '/blogs' },
  { label: 'Contact',  href: '/contact' },
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/ShanilPraveen',
    icon: FaGithub,
    color: 'hover:bg-[#333] hover:border-[#555]',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shanil-praveen',
    icon: FaLinkedin,
    color: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]',
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@jspraveen2002',
    icon: FaMedium,
    color: 'hover:bg-[#00ab6c] hover:border-[#00ab6c]',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61552762254541',
    icon: FaFacebook,
    color: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-[rgba(99,102,241,0.15)] overflow-hidden">
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="relative bg-[#030712]">
        
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-content py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* ── Column 1: Brand & Contact ── */}
          <div className="space-y-4">
            {/* Logo mark */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className="text-white font-bold text-sm">SP</span>
              </div>
              <span className="text-white font-semibold text-lg">Shanil Praveen</span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              CS & Engineering undergraduate at University of Moratuwa. Building thoughtful digital experiences.
            </p>

            <a
              href="mailto:shanilpraveen2000@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors group"
            >
              <IoIosMail size={16} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              shanilpraveen2000@gmail.com
            </a>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-indigo-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-500/0 group-hover:bg-indigo-400 transition-colors duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Social Links ── */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ label, href, icon: Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 ${color}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <p className="text-slate-500 text-xs leading-relaxed">
              Open to collaborations and interesting conversations.
            </p>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        {/* <div className="relative z-10 border-t border-white/5">
          <div className="container-content py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-slate-500 text-xs">
              © {year} Shanil Praveen. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs flex items-center gap-1">
              Built with <FaHeart size={10} className="text-indigo-400 mx-0.5" /> using Next.js & Tailwind CSS
            </p>
          </div>
        </div> */}
      </div>
    </footer>
  );
}
