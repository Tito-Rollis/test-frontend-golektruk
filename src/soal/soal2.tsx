import { useState } from 'react';

const data = [
    { id: 1, country: 'United States' },
    { id: 2, country: 'Canada' },
    { id: 3, country: 'Mexico' },
    { id: 4, country: 'Brazil' },
    { id: 5, country: 'Argentina' },
    { id: 6, country: 'United Kingdom' },
    { id: 7, country: 'France' },
    { id: 8, country: 'Germany' },
    { id: 9, country: 'Italy' },
    { id: 10, country: 'Spain' },
    { id: 11, country: 'Russia' },
    { id: 12, country: 'China' },
    { id: 13, country: 'Japan' },
    { id: 14, country: 'South Korea' },
    { id: 15, country: 'India' },
    { id: 16, country: 'Australia' },
    { id: 17, country: 'South Africa' },
    { id: 18, country: 'Egypt' },
    { id: 19, country: 'Nigeria' },
    { id: 20, country: 'Kenya' },
];

function ListComponent(props: { country: string; onClick: (list: string) => void }) {
    const [isHovered, setIsHovered] = useState(false);

    const onHoverHandler = () => setIsHovered(true);
    const onLeaveHandler = () => setIsHovered(false);
    const onClickHandler = () => props.onClick(props.country);

    return (
        <div
            onMouseEnter={onHoverHandler}
            onMouseLeave={onLeaveHandler}
            onClick={onClickHandler}
            style={{
                cursor: 'pointer',
                transition: 'all 0.5s',
                backgroundColor: isHovered ? 'gray' : 'white',
                color: isHovered ? 'white' : 'black',
                padding: '4px',
            }}
        >
            <p>{props.country}</p>
        </div>
    );
}

function BoxListComponent(props: { onClick: (list: string) => void; isShow: boolean }) {
    const handleClick = (list: string) => props.onClick(list);

    return (
        <div
            style={{
                display: props.isShow ? 'flex' : 'none',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
            }}
        >
            {data.map((list) => (
                <ListComponent onClick={handleClick} country={list.country} key={list.id} />
            ))}
        </div>
    );
}

function Soal2() {
    // buatlah select box tanpa menggunakan plugin
    const [selected, setSelected] = useState('');
    const [showList, setShowList] = useState(false);
    const [showCancel, setShowCancel] = useState(false);

    const handleClick = (list: string) => {
        setSelected(list);
        setShowList(false);
        setShowCancel(true);
    };
    const handleShow = () => setShowList(true);
    const handleCancel = () => {
        setSelected('');
        setShowCancel(false);
    };

    console.log(data);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '100px',
                width: '100%',
                height: 'min-content',
            }}
        >
            <div>
                <p
                    style={{
                        fontSize: '18px',
                        color: 'white',
                    }}
                >
                    value:{selected}
                </p>

                <div>
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                        }}
                    >
                        <input
                            onClick={handleShow}
                            value={selected}
                            type="text"
                            placeholder="Select"
                            style={{
                                backgroundColor: 'white',
                                padding: '8px',
                                borderRadius: '8px',
                            }}
                        />

                        {/* This is the "X" button */}
                        <h1
                            onClick={handleCancel}
                            style={{
                                display: showCancel ? 'block' : 'none',
                                cursor: 'pointer',
                                fontSize: '24px',
                                color: 'black',
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                right: '16px',
                            }}
                        >
                            X
                        </h1>
                    </div>
                    <BoxListComponent isShow={showList} onClick={handleClick} />
                </div>
            </div>

            {/* Ekspektasi hasil */}
            <iframe
                src="/soal2.mp4"
                style={{
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    border: '1px solid white',
                }}
            ></iframe>
        </div>
    );
}

export default Soal2;
