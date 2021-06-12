import React, { useEffect, useRef, useState } from 'react'
import MainpageCSS from './MainpageCSS.module.css'
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import firebase from '../../utils/firebase'
import loader from "../../Assets/loader.gif"


const Mainpage = () => {
    // State for Counter
    const [counter, setCounter] = useState('')
    const [selectedImgColor, setSelectedImgColor] = useState(["#eeeeee", "#eeeeee", "#eeeeee", "#eeeeee"])
    const [msg, setMsg] = useState('Brain Wave');
    const [data, setData] = useState([])
    const [images, setImages] = useState([])
    const [votes, setVotes] = useState([0, 0, 0, 0])
    const [display, setDisplay] = useState([0, 0, 0, 0])
    const [selected, setSelected] = useState(false)
    const [click, setClick] = useState(false)
    const [sum,setSum] = useState(0);

    const initial = useRef(true);

    const imgurl = "https://thumb.fakeface.rest/thumb_"
    // var sum = votes.reduce(function (a, b) {
    //     return a + b;
    // }, 0);

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


    function updateDataBase() {
        var qNo = getCounter()[0]
        const ref = firebase.database().ref('data').child(qNo);
        ref.update({
            ...data,
            "votes": votes
        })
    }

    useEffect(() => {
        var qNo = getCounter()[0]
        const ref = firebase.database().ref('data').child(qNo);
        ref.on('value', (snapshot) => {

            const all = snapshot.val();
            setVotes(all.votes)
            setData(all);
            setImages(all.images)
        });
    }, []);

    function updataData() {
        var qNo = getCounter()[0]
        const ref = firebase.database().ref('data').child(qNo);
        ref.on('value', (snapshot) => {
            const all = snapshot.val();
            var all_zero = all.votes.every(ele => ele === 0)
            // if (all_zero) {
            //     var randomVals = [[1, 2, 3, 4], [20, 30, 21, 15], [3, 2, 7, 1], [7, 1, 4, 10]]
            //     setVotes(randomVals[0])
            // }
            // else {
            //     setVotes(all.votes)
            // }
            setVotes(all.votes)
            setData(all);
            setImages(all.images)
        });
    }



    useEffect(() => {
        setInterval(() => {
            let remainder = getCounter()[1];
            setCounter(remainder);
        }, 1000)
    }, [])

    function handleClick(e) {

        if (!selected) {
            var target = e.target
            var img_no = target.alt
            setSelectedImgColor(p => { p[img_no] = "#a6bef7"; return p })
            setSelected(true)
            setMsg("result in last 5 Secs");
            setVotes(prev => { prev[img_no] += 1; return prev })
            setClick(true)
        }
    }

    useEffect(() => {
        if (initial.current) {
            initial.current = false;
        }
        else {
            if (click === true) {
                updateDataBase();
                setSum(votes.reduce((a,b)=>{
                    return a+b
                },0))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [click])

    useEffect(() => {
        if (initial.current) {
            initial.current = false;
        }
        else {
            if (counter === 29) {
                setMsg('BRAIN WAVE')
                setDisplay([0, 0, 0, 0])
                updataData()
                setSelected(false)
            }
            if (counter === 0) {
                setClick(false)
            }
            if (counter <= 5) {
                if (click === true) {
                    setSelectedImgColor(["#eeeeee", "#eeeeee", "#eeeeee", "#eeeeee"])
                    setDisplay(votes)
                    setMsg('Result')
                    updataData()
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [click, counter])


    // JSX
    return (
        <div className={`container ${MainpageCSS.container}`}>
            <div className={`card ${MainpageCSS.card}`}>

                <p className={MainpageCSS.user}>
                    Hey, {uname}!
                </p>

                <span className={MainpageCSS.txtspan}>
                    <h4 className={MainpageCSS.h1}>{data.question}</h4>
                </span>
                <div className="row">
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <CircularProgressbarWithChildren value={display[0]}
                                maxValue={(display[0] !== 0) ? sum : 1}

                                styles={{
                                    path: {
                                        // Path color
                                        stroke: `#ff808c`
                                    },
                                    trail: {
                                        // Trail color
                                        stroke: selectedImgColor[0],
                                    },

                                }}>
                                <img src={imgurl + images[0]} alt="0" onClick={handleClick} onError={e => e.target.src = loader} className={MainpageCSS.img} draggable="false" />
                            </CircularProgressbarWithChildren>

                            {(click && counter <= 5) &&
                                <span className={MainpageCSS.overlay}>
                                    <p className={MainpageCSS.percentage}>{(Math.round((display[0] / sum) * 100))}%</p>
                                </span>
                            }

                        </div>
                    </div>
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <CircularProgressbarWithChildren value={display[1]}
                                maxValue={(display[1] !== 0) ? sum : 1}
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
                            {(click && counter <= 5) &&
                                <span className={MainpageCSS.overlay}>
                                    <p className={MainpageCSS.percentage}>{(Math.round((display[1] / sum) * 100))}%</p>
                                </span>
                            }
                        </div>
                    </div>
                </div>

                <span className={MainpageCSS.span}>
                    <p className={MainpageCSS.counter}>{('0' + counter).slice(-2)}</p>
                </span>

                <div className="row mt-4">
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <CircularProgressbarWithChildren value={display[2]}
                                maxValue={(display[1] !== 0) ? sum : 1}
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
                            {(click && counter <= 5) &&
                                <span className={MainpageCSS.overlay}>
                                    <p className={MainpageCSS.percentage}>{(Math.round((display[2] / sum) * 100))}%</p>
                                </span>
                            }
                        </div>
                    </div>
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <CircularProgressbarWithChildren value={display[3]}
                                maxValue={(display[3] !== 0) ? sum : 1}
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
                            {(click && counter <= 5) &&
                                <span className={MainpageCSS.overlay}>
                                    <p className={MainpageCSS.percentage}>{(Math.round((display[3] / sum) * 100))}%</p>
                                </span>
                            }
                        </div>
                    </div>
                </div>
                <p className={MainpageCSS.p}>{msg}</p>
            </div>
        </div>
    )
}

export default Mainpage
