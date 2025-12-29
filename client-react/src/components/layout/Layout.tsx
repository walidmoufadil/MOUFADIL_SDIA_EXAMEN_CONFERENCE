import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <main className="container py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
