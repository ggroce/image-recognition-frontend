import React from 'react';
import './ImageRecognition.css';

const ImageRecognition = ({ imageUrl, box }) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
                <div className='bounding-box' 
                style={{top: box.top, right: box.right, bottom: box.bottom, left: box.left}}>
                </div>
            </div>
            
        </div>
    );
}
export default ImageRecognition;