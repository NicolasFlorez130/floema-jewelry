import React from "react"

const Data = ({ reversed = false, info }) => {

    return (
        <section className="data">
            <div className="wrapper">
                {!reversed ? (
                    <>
                        <h3>{info.label}</h3>

                        <p>{info.text.map((line, i) => {
                            return (<span key={i} >{line}<br /></span>)
                        })}</p>

                        <img src={info.image} alt={info.label} />
                    </>
                ) : (
                    <>
                        <img src={info.image} alt={info.label} />

                        <h3>{info.label}</h3>

                        <p>{info.text.map((line, i) => {
                            return (<span key={i}>{line}<br /></span>)
                        })}</p>
                    </>
                )}
            </div>
        </section>
    )
}

export default Data