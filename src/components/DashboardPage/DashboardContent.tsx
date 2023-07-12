import React, { useEffect, useState } from 'react';
import {
  Divider,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import _ from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/store';
import { resources } from '@/store/selectors';
import {
  deleteNote as _deleteNote,
  getAllNote as _getAllNote,
} from 'src/store/actions/resoursce/notes';
import { RESOURCE_NAME } from '@/utils/constant';
import moment from 'moment';
import useChakraToast from '@/hooks/useChakraToast';
import { errorToastfier } from '@/utils/toastifier';
import DashboardMainContainer from '../BaseComponent/DashboardMainContainer';
import DashboardContainer from '../BaseComponent/DashboardContainer';

const DashboardContent: ReactFC<Props> = ({
  notes,
  deleteNotes,
  getAllNote,
}) => {
  const toast = useChakraToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [noteId, setNoteId] = useState<number | null>(null);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      await getAllNote();

      setFirstLoad(false);
    })();
  }, []);

  const deleteNote = async () => {
    try {
      if (!noteId) return;

      await deleteNotes(noteId);
      onClose();
    } catch (e) {
      errorToastfier(toast, e);
    }
  };

  return (
    <DashboardMainContainer>
      <Stack
        bg={useColorModeValue('gray.50', 'gray.800')}
        py={16}
        px={8}
        spacing={{ base: 8, md: 10 }}
        align={'center'}
        direction={'column'}
      >
        {_.map(_.values(notes.rows), (note, index) => (
          <>
            <Heading>{note.title}</Heading>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              textAlign={'center'}
              maxW={'3xl'}
            >
              {note.post}
              <Text color={'gray.500'}>
                {moment(note.date).format('dddd / DD MMMM YYYY HH:mm:ss')}
              </Text>
            </Text>
            <Divider />
          </>
        ))}
      </Stack>
    </DashboardMainContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  notes: resources.getResource(RESOURCE_NAME.NOTES)(state),
});

const connector = connect(mapStateToProps, {
  deleteNotes: _deleteNote,
  getAllNote: _getAllNote,
});

type Props = ConnectedProps<typeof connector>;

export default connector(DashboardContent);
