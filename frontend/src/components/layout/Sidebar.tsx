import React from 'react';
import { BookOpen, Home, LogOut, User, Users } from 'react-feather';
import { Link, useHistory } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import useTranslation from '../../hooks/useTranslation';
import authService from '../../services/AuthService';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  className: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const history = useHistory();
  const { t } = useTranslation();

  const { authenticatedUser, setAuthenticatedUser } = useAuth();

  const handleLogout = async () => {
    await authService.logout();
    setAuthenticatedUser(null);
    history.push('/login');
  };

  return (
    <div
      className={'sidebar ' + className}
      style={{
        backgroundImage: 'url(/assets/sidemenu-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Link to="/" className="no-underline text-white">
        <div className="flex items-center justify-center mb-8">
          <img
            src="/assets/urbano-logo-white.png"
            alt="URBANO"
            className="h-12 w-auto"
          />
        </div>
      </Link>
      <nav className="flex flex-col gap-3 flex-grow">
        <SidebarItem to="/">
          <Home /> {t('navigation.dashboard')}
        </SidebarItem>
        <SidebarItem to="/courses">
          <BookOpen /> {t('navigation.courses')}
        </SidebarItem>
        <SidebarItem to="/profile">
          <User /> {t('navigation.profile')}
        </SidebarItem>
        {authenticatedUser.role === 'admin' ? (
          <SidebarItem to="/users">
            <Users /> {t('navigation.users')}
          </SidebarItem>
        ) : null}
      </nav>
      <button
        className="text-red-500 rounded-md p-3 transition-colors flex gap-3 justify-center items-center font-semibold focus:outline-none"
        onClick={handleLogout}
      >
        <LogOut /> {t('navigation.logout')}
      </button>
    </div>
  );
}
