import { Image } from '@chakra-ui/image';
import { Box, Text } from '@chakra-ui/layout';

interface charProps {
  character: string;
  reset: any;
}

const CharacterDetails = ({ character, reset }: charProps) => {
  return (
    <Box
      position="absolute"
      backgroundColor="rgba(0,0,0,0.3)"
      height="100vh"
      width="100vw"
      left="0"
    >
      <Image
        src={`/characters/${character}/gacha-splash`}
        mx="auto"
        mt={16}
        maxH="85vh"
      />
      <Text
        fontSize="7xl"
        color="white"
        position="absolute"
        top="0"
        right="20"
        onClick={() => reset('')}
      >
        x
      </Text>
    </Box>
  );
};

export default CharacterDetails;
