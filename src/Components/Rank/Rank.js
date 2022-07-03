import React from "react";

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className="f2 light-gray">
                {`${name}, your current entry count is...`}
            </div>

            <div className="f1 light-gray">
                {entries}
            </div>
        </div>
    );

}

export default Rank;