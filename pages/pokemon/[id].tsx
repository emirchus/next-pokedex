import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter();

  return (
    <Layout
      title={`Pokemon | ${pokemon.name}`}
      icon={pokemon.sprites.front_default}
    >
      <Grid.Container
        css={{
          marginTop: '10px'
        }}
        gap={2}
      >
        <Grid xs={12} sm={4}>
          <Card
            isHoverable
            css={{
              padding: '30px'
            }}
          >
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.['official-artwork'].front_default ||
                  ''
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>

              <Button color="gradient" ghost>
                Marcar Favorita
              </Button>
            </Card.Header>

            <Card.Body>
              <Text b>Sprites:</Text>
              <Container direction="row" display='flex' css={{
                width: '100%',
              }}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                ></Image>
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                ></Image>
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                ></Image>
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                ></Image>
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async ctx => {
  // const { data } = await  // your fetch function here

  const pokemons151 = Array(151)
    .fill(0)
    .map((_, index) => ({ id: `${index + 1}` }));

  return {
    paths: pokemons151.map(({ id }) => ({
      params: { id }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  const { id } = ctx.params as { id: string };

  const { data } = await PokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data
    }
  };
};

export default PokemonPage;