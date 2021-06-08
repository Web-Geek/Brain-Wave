import React, { useEffect, useState } from 'react'
import MainpageCSS from './MainpageCSS.module.css'
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import firebase from '../../utils/firebase'
import loader from "../../Assets/loader.gif"


const Mainpage = () => {
    // State for Counter
    const [counter, setCounter] = useState('')
    const [selectedImgColor, setSelectedImgColor] = useState(["#eeeeee", "#eeeeee", "#eeeeee", "#eeeeee"])
    const [result, setResult] = useState(false);
    const [msg, setMsg] = useState('Brain Wave');
    const [selectedImgNo, setSelectedImgNo] = useState('')

    const [data, setData] = useState([])
    const [images, setImages] = useState([])
    const [votes, setVotes] = useState([80, 40, 120,160])
    const [selected, setSelected] = useState(false)
    var sum = votes.reduce(function(a, b){
        return a + b;
    }, 0);

    // Local Storage
    var uname = localStorage.getItem('username')


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
        const ref = firebase.database().ref('data').child(1);
        ref.on('value', (snapshot) => {
            const all = snapshot.val();
            setData(all);
            setImages(all.images)
        });
    }, []);

    const imgurl = "https://thumb.fakeface.rest/thumb_"

    function updataData() {
        var qNo = getCounter()[0]
        const ref = firebase.database().ref('data').child(1);
        ref.on('value', (snapshot) => {
            const all = snapshot.val();
            // setVotes(all.votes)
            setData(all);
            setImages(all.images)
        });
    }



    useEffect(() => {
        setInterval(() => {
            let remainder = getCounter()[1];
            setCounter(remainder);
            if (remainder === 29) {
                setMsg('BRAIN WAVE')
                updataData()
                // setVotes([0, 0, 0, 0])
                setSelected(false)
            }
            if (remainder === 5) {
                setSelectedImgColor(["#eeeeee", "#eeeeee", "#eeeeee", "#eeeeee"])

                // setVotes([Math.random() * 50, Math.random() * 20, Math.random() * 40, Math.random() * 80])
                setMsg('Result')

            }
        }, 1000)
    }, [])

    function handleClick(e) {
    
        if (!selected) {
            var target = e.target
            var img_no = target.alt
            setSelectedImgColor(p=>{p[img_no]="#8c7b7b"; return p})
            setSelected(true)
            var uname= localStorage.getItem('username')
            setMsg('selected')
        }

    }



    // JSX
    return (
        <div className={`container ${MainpageCSS.container}`}>
            <div className={`card ${MainpageCSS.card}`}>

                <span className={MainpageCSS.txtspan}>
                    <h4 className={MainpageCSS.h1}>{data.question}</h4>
                </span>
                <div className="row">
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <CircularProgressbarWithChildren value={votes[0]}
                                maxValue={sum}
                                // minValue={Math.min(...votes)}
                                styles={{
                                    path: {
                                        // Path color
                                        stroke: `#ff808c`
                                    },
                                    trail: {
                                        // Trail color
                                        stroke: selectedImgColor[0],
                                    }
                                }}>
                                <img src={imgurl + images[0]} alt="0" onClick={handleClick} onError={e => e.target.src = loader} className={MainpageCSS.img} draggable="false" />
                            </CircularProgressbarWithChildren>

                        </div>
                    </div>
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <CircularProgressbarWithChildren value={votes[1]}
                                maxValue={sum}
                                styles={{
                                    path: {
                                        // Path color
                                        stroke: `#9180ff`
                                    },
                                    trail: {
                                        // Trail color
                                        stroke: selectedImgColor[1],
                                    }
                                }}>
                                <img src={imgurl + images[1]} alt="1" onClick={handleClick} onError={e => e.target.src = loader} className={MainpageCSS.img} draggable="false" />
                            </CircularProgressbarWithChildren>
                        </div>
                    </div>
                </div>

                <span className={MainpageCSS.span}>
                    <p className={MainpageCSS.counter}>{('0' + counter).slice(-2)}</p>
                </span>

                <div className="row mt-4">
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <CircularProgressbarWithChildren value={votes[2]}
                                maxValue={sum}
                                styles={{
                                    path: {
                                        // Path color
                                        stroke: `#84db92`
                                    },
                                    trail: {
                                        // Trail color
                                        stroke: selectedImgColor[2],
                                    }
                                }}>
                                <img src={imgurl + images[2]} alt="2" onClick={handleClick} onError={e => e.target.src = loader} className={MainpageCSS.img} draggable="false" />
                            </CircularProgressbarWithChildren>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <CircularProgressbarWithChildren value={votes[3]}
                                maxValue={sum}
                                styles={{
                                    path: {
                                        // Path color
                                        stroke: `#f2dc5e`
                                    },
                                    trail: {
                                        // Trail color
                                        stroke: selectedImgColor[3],
                                    }
                                }}>
                                <img src={imgurl + images[3]} alt="3" onClick={handleClick} onError={e => e.target.src = loader} className={MainpageCSS.img} draggable="false" />
                            </CircularProgressbarWithChildren>
                        </div>
                    </div>
                </div>
                <p className={MainpageCSS.p}>{msg}</p>
            </div>
        </div>
    )
}

export default Mainpage
