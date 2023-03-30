import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
               <img id="inputImage" alt="" src={imageUrl} width='500px' height='auto'/>

                {
                boxes.map(box => {

                    return <div key={box.toprow} className='bounding-box' style={{top: box.toprow, right: box.rightcol, bottom: box.bottomrow, left: box.leftcol}}></div>
                })
                }
           </div>
        </div>
    )
}


export default FaceRecognition;