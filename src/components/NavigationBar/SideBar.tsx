import React from 'react';
import { useRouter } from 'next/navigation';
import useTopBarHeight from '@/utils/useTopBarHeight';
import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiBookOpen,
  FiLogOut,
} from 'react-icons/fi';
import {
  AspectRatio,
  CloseButton,
  Flex,
  Link,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { removeToken } from 'src/utils/sessionUtils';

const SideBar: ReactFC<Props> = ({ show }) => {
  const router = useRouter();
  const decreasor = useTopBarHeight();
  const { onClose } = useDisclosure();

  return (
    <Flex
      height={{ base: `calc(100vh - ${decreasor}px)`, md: '100%' }}
      width={{ base: '100%', md: '20rem' }}
      mr={{ base: 0, md: 5 }}
      position={{
        base: 'absolute',
        md: 'relative',
      }}
      bg="white"
      left={{ base: show ? 0 : '-100%', md: 0 }}
      zIndex={5}
    >
      <VStack
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Note For Introvert
          </Text>
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Flex>
        <Flex
          width="100%"
          align="center"
          p="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          onClick={() => router.push('/dashboard')}
        >
          <Flex
            alignItems={'center'}
            cursor={'pointer'}
            _hover={{ color: 'white' }}
          >
            <AspectRatio ratio={1} width={8} mr={2}>
              <FiHome />
            </AspectRatio>
            <Text>Dashboard</Text>
          </Flex>
        </Flex>
        <Flex
          width="100%"
          align="center"
          p="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          onClick={() => router.push('/dashboard/notes')}
        >
          <Flex
            alignItems={'center'}
            cursor={'pointer'}
            _hover={{ color: 'white' }}
          >
            <AspectRatio ratio={1} width={8} mr={2}>
              <FiBookOpen />
            </AspectRatio>
            <Text>Add Notes</Text>
          </Flex>
        </Flex>
        <Flex
          width="100%"
          align="center"
          p="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          onClick={() => {
            removeToken();
            router.push('/login');
          }}
        >
          <Flex
            alignItems={'center'}
            cursor={'pointer'}
            _hover={{ color: 'white' }}
          >
            <AspectRatio ratio={1} width={8} mr={2}>
              <FiLogOut />
            </AspectRatio>
            <Text>Log Out</Text>
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  );
};

type Props = {
  show: boolean;
};

export default SideBar;
