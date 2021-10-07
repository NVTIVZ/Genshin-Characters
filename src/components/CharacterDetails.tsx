import { Image } from '@chakra-ui/image';
import { Box, Text } from '@chakra-ui/layout';
import { ScaleFade } from '@chakra-ui/transition';

interface charProps {
  character: string;
  reset: any;
}

const CharacterDetails = ({ character, reset }: charProps) => {
  return (
    <Box
      position="absolute"
      backgroundColor="rgba(0,0,0,0.5)"
      height="100vh"
      width="100vw"
      left="0"
    >
      <ScaleFade
        initialScale={0.7}
        in={true}
        transition={{
          enter: {
            duration: 0.6,
          },
        }}
      >
        <Image
          src={`/characters/${character}/gacha-splash`}
          mx="auto"
          mt={16}
          maxH="85vh"
        />
      </ScaleFade>
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
