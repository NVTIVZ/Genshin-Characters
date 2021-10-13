import { useQuery } from 'react-query';
import { Flex, Heading } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { useState } from 'react';
import CharacterDetails from './CharacterDetails';

const MainPage = () => {
  const [selected, setSelected] = useState('');

  const { status, data } = useQuery('characters', () =>
    fetch('https://api.genshin.dev/characters').then((res) => res.json())
  );

  console.log(status);
  console.info(data);
  console.log(selected);
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'error') return <p>Error :(</p>;

  return (
    <Flex
      px={64}
      flexDirection="column"
      backgroundImage="/wp9230740-lantern-rite-wallpapers.png"
      minH="100vh"
    >
      {selected ? (
        <CharacterDetails character={selected} reset={setSelected} />
      ) : (
        ''
      )}
      <Image src="/Genshin_Impact_logo.svg" alt="logo" mx={64} />
      <Heading mx="auto" fontSize="5xl" mt={8} color="white">
        Select a character
      </Heading>
      <Flex wrap="wrap" justifyContent="center" mt={12}>
        {data.map((character: string, index: number) => {
          return (
            <Image
              key={index}
              src={`/characters/${character}/icon`}
              alt={character}
              onClick={() => setSelected(character)}
              width={24}
              mx={2}
              my={2}
              border="1px"
              borderRadius="md"
              borderColor="blackAlpha.500"
              backgroundColor="rgba(255,255,255,0.4)"
              transition="ease-in-out background 0.2s"
              _hover={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
              }}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default MainPage;
