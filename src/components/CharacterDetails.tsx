import { InfoIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/react';
import { ScaleFade } from '@chakra-ui/transition';
import { useQuery } from 'react-query';

interface charProps {
  character: string;
  reset: any;
}

const CharacterDetails = ({ character, reset }: charProps) => {
  const response = useQuery('singleCharacter', () =>
    fetch(`https://api.genshin.dev/characters/${character}`).then((res) =>
      res.json()
    )
  );
  console.log(character);
  console.log(response.status);
  console.info(response.data);
  if (response.status === 'loading') return <p>Loading...</p>;
  if (response.status === 'error') return <p>Error :(</p>;

  const starDecider = (num: number) => {
    const elements = [];
    for (let i = 0; i < num; i++) {
      console.log(i);
      elements.push(<Image src="/stars.png" width={6} key={i} />);
    }
    return elements;
  };

  return (
    <Flex
      position="absolute"
      flexDirection="column"
      backgroundColor="rgba(0,0,0,0.5)"
      height="100vh"
      width="100vw"
      left="0"
      px={16}
    >
      <Box
        color="white"
        mx="auto"
        mt={4}
        zIndex="1"
        d="flex"
        alignItems="center"
      >
        <Image
          src={`/elements/${response.data.vision}/icon`}
          alt={response.data.vision}
          width={12}
        />
        <Heading ml={4}>{response.data.name}</Heading>
      </Box>
      <Flex flexDirection="row" justifyContent="center">
        <Box color="white" d="flex" flexDirection="column">
          <Heading>Nation:</Heading>
          <Box d="flex">
            <Image
              src={`/nations/${response.data.nation}/icon`}
              alt="nation"
              width={8}
            />
            <Text fontSize="2xl" ml={1}>
              {response.data.nation}
            </Text>
          </Box>
          <Heading mt={4}>Birthday:</Heading>
          <Text fontSize="2xl">
            {response.data.birthday ? response.data.birthday.slice(5) : ''}
          </Text>
          <Heading mt={4}>Rarity:</Heading>
          <Box d="flex">{starDecider(response.data.rarity)}</Box>
          <Heading mt={4}>Skill Talents:</Heading>
          {response.data.skillTalents.map((talent: any) => {
            return (
              <Box
                key={talent.name}
                maxW="350px"
                mt={2}
                d="flex"
                alignItems="center"
              >
                <Heading fontSize="2xl">{talent.name}</Heading>
                <Tooltip label={talent.description} placement="right">
                  <InfoIcon ml={2} />
                </Tooltip>
              </Box>
            );
          })}
          <Heading mt={4}>Constellation:</Heading>
          <Text fontSize="2xl">{response.data.constellation}</Text>
        </Box>
        <ScaleFade
          initialScale={0.7}
          in={true}
          transition={{
            enter: {
              duration: 0.8,
              delay: 0.2,
            },
          }}
        >
          <Image
            src={`/characters/${character}/gacha-splash`}
            maxH="85vh"
            mx="auto"
          />
        </ScaleFade>
        <Box color="white" d="flex" flexDirection="column">
          <Heading>Passive Talents:</Heading>
          {response.data.passiveTalents.map((talent: any) => {
            return (
              <Box key={talent.name} maxW="350px" mt={2}>
                <Heading fontSize="2xl">{talent.name}</Heading>
                <Text fontSize="md">{talent.description}</Text>
              </Box>
            );
          })}
        </Box>
      </Flex>

      <Text
        fontSize="7xl"
        color="white"
        position="absolute"
        top="0"
        right="20"
        onClick={() => reset('')}
        _hover={{ cursor: 'pointer' }}
      >
        x
      </Text>
    </Flex>
  );
};

export default CharacterDetails;
