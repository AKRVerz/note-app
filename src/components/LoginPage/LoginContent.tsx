import React from 'react';
import { Flex, Image, Stack } from '@chakra-ui/react';
import LoginForm from './LoginForm';

const LoginContent: ReactFC = () => {
  return (
    <Stack bg="white" minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <LoginForm />
      </Flex>
      <Flex flex={1}>
        <Image alt={'Login Image'} objectFit={'cover'} src={'/bg.jpg'} />
      </Flex>
    </Stack>
  );
};

export default LoginContent;
