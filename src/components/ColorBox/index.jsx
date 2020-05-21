import React,{ useState } from 'react';
import './ColorBox.scss';

ColorBox.propTypes = {
    
};

function getRandomColor(){
    const COLOR_LIST = ['deeppink', 'green', 'yellow', 'black', 'blue'];
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];
}

function ColorBox(props) {
    
    const [color, setColor] = useState(()=> {
        const initColor = localStorage.getItem('color-box') || ('grey');
        console.log(initColor);
        return initColor;
    });

    function handleBoxClick(){
        const newColor = getRandomColor();
        setColor(newColor);

        localStorage.setItem('color-box', newColor);
    }

    return (
        <div className='color-box'
            style= {{backgroundColor: color}}
            onClick={()=> handleBoxClick()}>
            Color Box
        </div>
    );
}

export default ColorBox;