'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRole, isAuthenticated } from 'src/utils/sessionUtils';
import { USER_ROLE } from 'src/utils/constant';

const Home = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const getPageToShow = () => {
    const role = getRole();

    switch (role) {
      case USER_ROLE.MEMBER:
        return router.push('/dashboard');
      default:
        return router.push('/dashboard');
    }
  };

  useEffect(() => {
    if (!router.push) return;

    const isLogin = isAuthenticated();
    setIsLogin(isLogin);

    if (!isLogin) router.push('/login');
  }, [router.push]); // eslint-disable-line react-hooks/exhaustive-deps

  return isLogin ? getPageToShow() : null;
};

export default Home;
