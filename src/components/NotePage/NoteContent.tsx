import React, { useState } from 'react';
import DashboardMainContainer from '../BaseComponent/DashboardMainContainer';
import useChakraToast from '@/hooks/useChakraToast';
import { useRouter } from 'next/navigation';
import { errorToastfier } from '@/utils/toastifier';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { createNote as _createNote } from '@/store/actions/resoursce/notes';
import { noteSchema } from '@/utils/formSchema';
import { ConnectedProps, connect } from 'react-redux';
import { buttonStyle } from '@/utils/styles';

const NoteContent: React.FC<Props> = ({ createNote }) => {
  const toast = useChakraToast();
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const router = useRouter();

  const create = async (value: Note.Resource.Create['notes']) => {
    setIsRequested(true);

    try {
      await createNote(value);
      toast('Done Add New Note');

      return setTimeout(() => {
        router.push('/dashboard');
      }, 300);
    } catch (e) {
      errorToastfier(toast, e);
    }

    setIsRequested(false);
  };

  return (
    <DashboardMainContainer>
      <Flex p={5} flexDirection="column" height="100%">
        <Formik
          initialValues={{
            date: undefined as unknown as Date,
            title: undefined as unknown as string,
            post: undefined as unknown as string,
          }}
          validationSchema={noteSchema}
          onSubmit={create}
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
              <VStack spacing={2} py={2}>
                <FormControl isInvalid={!!errors.date && !!touched.date}>
                  <FormLabel>Date</FormLabel>
                  <Input
                    id="date"
                    placeholder="date"
                    value={values.date as unknown as string}
                    onChange={handleChange('date')}
                    onBlur={handleBlur('date')}
                    type="date"
                  />
                  {!!errors.date && touched.date && (
                    <FormErrorMessage>{errors.date as string}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.date && !!touched.date}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    id="title"
                    placeholder="title"
                    value={values.title as unknown as string}
                    onChange={handleChange('title')}
                    onBlur={handleBlur('title')}
                    type="title"
                  />
                  {!!errors.title && touched.title && (
                    <FormErrorMessage>
                      {errors.title as string}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.date && !!touched.date}>
                  <FormLabel>Post</FormLabel>
                  <Input
                    id="post"
                    placeholder="post"
                    value={values.post as unknown as string}
                    onChange={handleChange('post')}
                    onBlur={handleBlur('post')}
                    type="post"
                  />
                  {!!errors.post && touched.post && (
                    <FormErrorMessage>{errors.post as string}</FormErrorMessage>
                  )}
                </FormControl>
              </VStack>
              <Button
                {...buttonStyle.confirmation}
                fontFamily="poppins"
                fontSize={'0.813rem'}
                px={10}
                borderRadius={6}
                _focus={{ border: 'none' }}
                type="submit"
                disabled={isRequested}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </DashboardMainContainer>
  );
};
const connector = connect(null, {
  createNote: _createNote,
});

type Props = ConnectedProps<typeof connector>;

export default connector(NoteContent);
