import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Flex } from '@chakra-ui/react';

const TopBar: ReactFC<Props> = ({ setShow }) => {
  return (
    <Flex
      display={{ base: 'flex', md: 'none' }}
      _hover={{ color: 'royalRed.100' }}
    >
      <GiHamburgerMenu onClick={() => setShow((curr) => !curr)} />
    </Flex>
  );
};

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export default TopBar;
