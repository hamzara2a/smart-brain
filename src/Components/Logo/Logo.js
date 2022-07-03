import React from "react";
import Brain from "./MemoryMentorLogo.png";

const Logo = () => {
    return (
        <div className="flex flex-start dim w-10 h-10 pa2 br3 shadow-3 ma3 mt0 bg-light-gray">
            <img className="mw-100" alt="logo" src={Brain}/>
        </div>
    )
}

export default Logo;