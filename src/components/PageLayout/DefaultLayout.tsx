import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import useTopBarHeight from 'src/utils/useTopBarHeight';
import NavigationBar from '../NavigationBar';

const DefaultLayout: ReactFC = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const decreasor = useTopBarHeight();

  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100vw'}>
      <NavigationBar.TopBar setShow={setShow} />
      <Flex flex={1}>
        <NavigationBar.SideBar show={show} />
        <Flex
          width={'100%'}
          height={`calc(100vh - ${decreasor}px)`}
          overflow={'auto'}
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DefaultLayout;
