import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  children: any;
  to: string;
  active?: boolean;
}

export default function SidebarItem({
  children,
  to,
  active = false,
}: SidebarItemProps) {
  const location = useLocation();
  const isActive = active || location.pathname === to;

  return (
    <Link
      to={to}
      className={`no-underline sidebar-item ${isActive ? 'active' : ''}`}
    >
      {children}
    </Link>
  );
}
