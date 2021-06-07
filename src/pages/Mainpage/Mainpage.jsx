import React, { useEffect, useState } from 'react'
import MainpageCSS from './MainpageCSS.module.css'
import firebase from '../../utils/firebase'


const Mainpage = () => {
    // State for Counter
    const [counter, setCounter] = useState('')
    const [data, setData] = useState([])
    const [images, setImages] = useState([])

    // loading img
    const loading_img = "https://abucoins.com/img/trade/pre-loading.gif"



    function getCounter() {
        var d = new Date();
        var h = d.getUTCHours();
        var m = d.getUTCMinutes();
        var s = d.getUTCSeconds();
        var secondsUntilEndOfDate = 24 * 60 * 60 - h * 60 * 60 - m * 60 - s;
        var questionNo = Math.trunc(secondsUntilEndOfDate / 30)
        var remainder = (secondsUntilEndOfDate % 30)
        return [questionNo, remainder]
    }

    useEffect(() => {
        var qNo = getCounter()[0]
        const ref = firebase.database().ref('data').child(qNo);
        ref.on('value', (snapshot) => {
            const all = snapshot.val();
            setData(all);
            setImages(all.images)
        });
    }, []);

    const imgurl = "https://thumb.fakeface.rest/thumb_"



    useEffect(() => {
        setInterval(() => {
            let  [q,remainder] = getCounter();
            // console.log(q,remainder)
            setCounter(remainder);
            if (remainder === 29) {
                var qNo = getCounter()[0]
                const ref = firebase.database().ref('data').child(qNo);
                ref.on('value', (snapshot) => {
                    const all = snapshot.val();
                    setData(all);
                    setImages(all.images)
                });
            }
        }, 1000)
    }, [])


    // JSX
    return (
        <div className={`container ${MainpageCSS.container}`}>
            <div className={`card ${MainpageCSS.card}`}>

                {/* <div className={MainpageCSS.layer}>
                    <span className={MainpageCSS.spinner}></span>
                </div> */}

                <span className={MainpageCSS.txtspan}>
                    <h4 className={MainpageCSS.h1}>{data.question}</h4>
                </span>
                <div className="row">
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <img src={imgurl + images[0]} alt="" onError={e=>e.target.src=loading_img} className={MainpageCSS.img} draggable="false" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <img src={imgurl + images[1]} alt="" onError={e=>e.target.src=loading_img} className={MainpageCSS.img} draggable="false" />
                        </div>
                    </div>
                </div>

                <span className={MainpageCSS.span}>
                    <p className={MainpageCSS.counter}>{('0' + counter).slice(-2)}</p>
                </span>

                <div className="row mt-4">
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <img src={imgurl + images[2]} alt="" onError={e=>e.target.src=loading_img} className={MainpageCSS.img} draggable="false" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <img src={imgurl + images[3]} alt="" onError={e=>e.target.src=loading_img} className={MainpageCSS.img} draggable="false" />
                        </div>
                    </div>
                </div>
                <p className={MainpageCSS.p}>Brain Wave</p>
            </div>
        </div>
    )
}

export default Mainpage
