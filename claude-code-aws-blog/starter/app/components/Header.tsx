import Link from 'next/link';
import { withBasePath } from '@/app/lib/basePath';

export default function Header() {
  return (
    <header className="bg-aws-dark text-white sticky top-0 z-50 shadow-xl border-b-2 border-aws-orange/20 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link
            href={withBasePath('/')}
            className="flex items-center gap-3 no-underline group"
          >
            <div className="bg-aws-orange px-4 py-2 rounded-lg font-bold text-lg shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 group-hover:bg-[#ff8800]">
              AWS
            </div>
            <span className="text-xl font-semibold text-white hidden sm:inline transition-colors duration-300 group-hover:text-aws-orange">
              Claude Code Blog
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 md:gap-6">
            <Link
              href={withBasePath('/')}
              className="nav-link text-white hover:text-aws-orange transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-aws-orange/10 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-aws-orange after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Home
            </Link>
            <Link
              href={withBasePath('/#posts')}
              className="nav-link text-white hover:text-aws-orange transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-aws-orange/10 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-aws-orange after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Posts
            </Link>
            <Link
              href={withBasePath('/about')}
              className="nav-link text-white hover:text-aws-orange transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-aws-orange/10 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-aws-orange after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
