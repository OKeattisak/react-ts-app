import { Center, Loader, Image, Card, Text, Badge, Group, Box } from "@mantine/core"
import axios from "axios"
import { useEffect, useState } from "react"

interface Pokemon {
    id: number
    name: string
    sprites: {
        front_default: string
        front_shiny: string
    }
    types: {
        slot: number,
        type: {
            name: string
        }
    }[]
}

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    const fetchPokemon = async () => {
        try {
            const promises = []
            for (let i = 1; i <= 50; i++) {
                promises.push(axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${i}/`))
            }
            const responses = await Promise.all(promises)
            const data = responses.map(response => response.data)
            setPokemons(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchPokemon()
    }, [])

    return (
        <>
            {isLoading ? (
                <Center h={'80dvh'}>
                    <Loader color="blue" />
                </Center>
            ) : (
                <Box mx="10px" my="10px">
                    <Text size="md">My Pokemon</Text>
                    {pokemons.map(pokemon => (
                        <div key={pokemon.id}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder my="10px">
                                <Card.Section>
                                    <Image
                                        src={pokemon.sprites.front_default}
                                        alt={pokemon.name}
                                    />
                                </Card.Section>

                                <Group justify="space-between" mt="md" mb="xs">
                                    <Text fw={500}>{pokemon.name}</Text>
                                    <Group>
                                        {pokemon.types.map(type => (
                                            <div key={type.slot}>
                                                <Badge>{type.type.name}</Badge>
                                            </div>
                                        ))}
                                    </Group>

                                </Group>
                            </Card>
                        </div>
                    ))}
                </Box>
            )}
        </>
    )
}