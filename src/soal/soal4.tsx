import { useState, useRef, useEffect, useCallback } from 'react';

interface PokemonDataType {
    count: 1302;
    next: 'https://pokeapi.co/api/v2/pokemon/?offset=15&limit=10';
    previous: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=5';
    results: { name: string; url: string }[];
}
// Soal Nomor 4
// Buatlah sebuah website yang menampilkan daftar pokemon yang di load dengan infinite scroll

const BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokemon: (offset: number, limit: number) => Promise<PokemonDataType> = async (
    offset: number,
    limit: number
) => {
    // fungsi untuk fetch data pokemon
    const response = await fetch(`${BASE_URL}/pokemon/?offset=${offset}&limit=${limit}`);
    const pokemon: Promise<PokemonDataType> = response.json();
    return pokemon;
};

const Soal4 = () => {
    const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
    //  Tambahkan state yang dibutuhkan
    // ...
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(50);

    console.log(pokemonList);

    const theRef = useRef<HTMLDivElement | null>(null);
    const intObserver = useRef<IntersectionObserver>();
    const lastPokemon = useCallback((node: HTMLDListElement) => {
        setLoading(true);
        if (node === null) return;
        if (intObserver.current) intObserver.current.disconnect();
        intObserver.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                handleInfiniteScroll();
                console.log(entries[0].target.textContent);
            }
        });
        intObserver.current.observe(node);
    }, []);
    const handleFetchPokemon = async (offset: number, limit: number) =>
        fetchPokemon(offset, limit).then((pokemon: PokemonDataType) => {
            setPokemonList(pokemon.results);
            setLoading(false);
        });

    useEffect(() => {
        setLoading(true);
        handleFetchPokemon(offset, limit);
    }, [offset, limit]);

    // Fungsi untuk infinite scroll
    // ...
    const handleInfiniteScroll = () => {
        setLoading(true);
        setOffset((prev) => prev + 50);
        setLimit((prev) => prev + 50);
    };
    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
            }}
        >
            <div
                style={{
                    flexGrow: 1,
                    color: 'white',
                    fontSize: '1.5em',
                    textAlign: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <h1
                    style={{
                        fontWeight: 'bolder',
                    }}
                >
                    Pokémon Infinite Scroll
                </h1>
                {/* list pokemon beserta loading */}
                <ul>
                    {pokemonList.map((pokemon, id) => (
                        <li ref={id === pokemonList.length - 1 ? lastPokemon : null} key={id}>
                            {pokemon.name}
                        </li>
                    ))}
                </ul>
                {loading && (
                    <h1 style={{ color: 'white', fontSize: '32px', textAlign: 'center' }}>Loading more Pokémon....</h1>
                )}
            </div>
            <iframe
                src="/soal4.mp4"
                style={{
                    height: '100vh',
                    border: '1px solid white',
                }}
            ></iframe>
        </div>
    );
};

export default Soal4;
