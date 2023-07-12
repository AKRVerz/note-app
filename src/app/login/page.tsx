'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginContent from 'src/components/LoginPage/LoginContent';
import { isAuthenticated } from 'src/utils/sessionUtils';

const Login = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (!router.push) return;

    const isLogin = isAuthenticated();

    setIsLogin(isLogin);

    if (!isLogin) return;
    router.push('/dashboard');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return !isLogin ? <LoginContent /> : null;
};

export default Login;
