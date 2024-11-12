import { useState } from 'react';

const Soal1 = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const [isDragged, setIsDragged] = useState(false);
    // 1. Buat kotak dibawah menjadi elemen drag and drop tanpa menggunakan plugin
    const onMouseDownHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
        setIsDragged(true);
    };
    const onMouseLeaveHandler = () => setIsDragged(false);

    const onMouseMoveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isDragged) {
            setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
        }
    };
    return (
        <>
            <div
                onMouseMove={(e) => onMouseMoveHandler(e)}
                onMouseUp={onMouseLeaveHandler}
                onMouseDown={(e) => onMouseDownHandler(e)}
                style={{
                    left: position.x + 'px',
                    top: position.y + 'px',
                    position: 'absolute',
                    backgroundColor: '#fff',
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                }}
            ></div>

            {/* Ekspektasi hasil */}
            <iframe
                src="/soal1.mp4"
                style={{
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    border: '1px solid white',
                }}
            ></iframe>
        </>
    );
};

export default Soal1;
