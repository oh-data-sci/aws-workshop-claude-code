import Link from 'next/link';
import { withBasePath } from '@/app/lib/basePath';

export default function Header() {
  return (
    <header className="bg-aws-dark text-white sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link
            href={withBasePath('/')}
            className="flex items-center gap-3 no-underline hover-logo"
          >
            <div className="bg-aws-orange px-4 py-2 rounded-lg font-bold text-lg">
              AWS
            </div>
            <span className="text-xl font-semibold text-white hidden sm:inline">
              Claude Code Blog
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href={withBasePath('/')}
              className="nav-link text-white hover:text-aws-orange transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href={withBasePath('/#posts')}
              className="nav-link text-white hover:text-aws-orange transition-colors font-medium"
            >
              Posts
            </Link>
            <Link
              href={withBasePath('/about')}
              className="nav-link text-white hover:text-aws-orange transition-colors font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
