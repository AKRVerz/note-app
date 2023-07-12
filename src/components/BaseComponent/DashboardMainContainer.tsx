import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

const DashboardMainContainer: React.FC<FlexProps> = ({
  children,
  ...props
}) => {
  return (
    <Flex
      marginTop={20}
      bg="white"
      width={'100%'}
      p={3}
      flexDirection={'column'}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default DashboardMainContainer;
