import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  useDisclosure,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  Stack,
  Checkbox,
  Link,
  Heading,
  FormLabel,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { RiLockPasswordLine, RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { connect, ConnectedProps } from 'react-redux';
import { errorToastfier } from 'src/utils/toastifier';
import { userLogin as _userLogin } from 'src/store/actions/currentUser';
import useChakraToast from 'src/hooks/useChakraToast';
import { useRouter } from 'next/navigation';

const LoginForm: ReactFC<Props> = ({ userLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const toast = useChakraToast();
  const { onOpen } = useDisclosure();
  const router = useRouter();

  const login = async (
    values: Pick<Note.Resource.ResourceStructure['users'], 'email' | 'password'>
  ) => {
    try {
      const result = await userLogin(values);
      router.push('/dashboard');
      toast('Login Berhasil');
    } catch (e) {
      console.log(e);
      errorToastfier(toast, e);
    }
  };

  return (
    <React.Fragment>
      <Stack spacing={4} w={'full'} maxW={'md'}>
        <Heading color="black" fontSize={'2xl'}>
          Sign in to your account
        </Heading>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={login}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
          }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <VStack spacing={5} borderRadius="20px">
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel color="black">Email address</FormLabel>
                  <InputGroup borderColor={'#603601'}>
                    <InputLeftElement pointerEvents="none">
                      <BiUser color="black" />
                    </InputLeftElement>
                    <Input
                      id="email"
                      placeholder="email"
                      color="black"
                      boxShadow="lg"
                      value={values.email}
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                  </InputGroup>
                  {!!errors.email && touched.email && (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel color="black">Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <RiLockPasswordLine color="black" />
                    </InputLeftElement>
                    <Input
                      id="password"
                      placeholder="Password"
                      color="black"
                      boxShadow="lg"
                      type={passwordVisible ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />
                    <InputRightElement>
                      {passwordVisible ? (
                        <RiEyeOffFill
                          onClick={() => setPasswordVisible(false)}
                          color="black"
                        />
                      ) : (
                        <RiEyeFill
                          onClick={() => setPasswordVisible(true)}
                          color="black"
                        />
                      )}
                    </InputRightElement>
                  </InputGroup>
                  {!!errors.password && touched.password && (
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  )}
                </FormControl>

                <Flex
                  justifyContent={'center'}
                  cursor={'pointer'}
                  onClick={onOpen}
                ></Flex>
              </VStack>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox color="black">Remember me</Checkbox>
                  <Link color={'blue.500'}>Forgot password?</Link>
                </Stack>
                <Button
                  as="button"
                  borderRadius="md"
                  px={4}
                  h={10}
                  type="submit"
                  colorScheme={'blue'}
                  variant={'solid'}
                >
                  Sign in
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </React.Fragment>
  );
};

const connector = connect(null, {
  userLogin: _userLogin,
});

type Props = ConnectedProps<typeof connector>;

export default connector(LoginForm);
