import { useEffect, useState } from 'react';

interface DataType {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export default function Soal3() {
    /**
     * ? 1. hilangkan semua error dan deskripsikan apa penyebab error.
     * ? 2. tampilkan data yang di panggil dari api tersebut...
     */

    return <SeachComponent />;
}

function SeachComponent() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<DataType[]>([]);

    useEffect(() => {
        async function fetchData() {
            // search merupakan string, bukan Object sehingga search.id error

            // const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${search.id}`);
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${search}`);
            const data = await response.json();
            console.log(data);
            // Terdapat error "results.map is not a function, ini terjadi karena yang sebelumnya results merupakan array, tetapi setelah fetching, results menjadi object"

            // Hasil data yang dibalikan dari  API merupakan Object, sehingga kita perlu membuat results menjadi Array of Object. Dengan demikian results dapat diloop menggunakan map

            // setResults(data)
            setResults(() => [data]);
        }

        if (search) fetchData();
    }, [search]);

    return (
        <div>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
            <ul>
                {results.map((result) => (
                    // Tipe data dari API tidak ada property "name", melainkan "title" sehingga result.name error. Jadi kita akan ganti dengan result.title
                    // <li key={result.id}>{result.name}</li>
                    <li style={{ color: 'white' }} key={result.id}>
                        {result.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
