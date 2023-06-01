import React, { useContext } from 'react';
import UserAvatar from '../../images/banner.jpg';
import { UserContext } from '../../context/userInfo';
import useRefreshToken from '../../hooks/useRefreshToken';
function WelcomeBanner() {
  const { user } = useContext(UserContext)
  const refreshToken = useRefreshToken();
  return (
    <div className="relative p-4 rounded-sm overflow-hidden mb-2">
      {/* Content */}
      <div className="relative" style={{ background: `url(${'/images/banner.jpg'})` }}>
        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">Xin chào, {user?.name}. 👋</h1>
      </div>

    </div>
  );
}

export default WelcomeBanner;
