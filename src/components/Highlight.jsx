import React from "react"

const Highlight = ({ info }) => {
    return (
        <section className="highlight">
            <div className="wrapper">
                <img src={info.image_1} alt={info.title} />
                <p>{info.title}</p>
                <img src={info.image_2} alt={info.title} />
            </div>
        </section>
    )
}

export default Highlight