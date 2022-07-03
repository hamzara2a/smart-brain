import React from "react";
import "./ImageLinkForm.css"

const ImageLinkForm = ({ onButtonSubmit, onInputChange }) => {
    return (
        <div>
            
            <p className="f3 light-gray">
                {"Try Out This Cool App I Just Made. It Will Detect The Face Of Any Picture You Present!"}
            </p>

            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input 
                    type="text" 
                    className="w-70 f4 center pa2" 
                    onChange={onInputChange}
                    />
                    <button onClick={onButtonSubmit} className="grow w-30 dib white bg-black">
                        Detect
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;