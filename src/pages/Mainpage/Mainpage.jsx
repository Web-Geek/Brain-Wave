import React, { useEffect, useState } from 'react'
import MainpageCSS from './MainpageCSS.module.css'
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import firebase from '../../utils/firebase'
import loader from "../../Assets/loader.gif"


const Mainpage = () => {
    // State for Counter
    const [counter, setCounter] = useState('')
    const [data, setData] = useState([])
    const [images, setImages] = useState([])
    const [votes,setVotes] = useState([0,0,0,0])
    const [selected, setSelected] = useState(false)


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
            let remainder = getCounter()[1];
            setCounter(remainder);
            if (remainder === 29) {
                var qNo = getCounter()[0]
                const ref = firebase.database().ref('data').child(qNo);
                ref.on('value', (snapshot) => {
                    const all = snapshot.val();
                    setData(all);
                    setImages(all.images)
                });
                setVotes([0,0,0,0])
                setSelected(false)
            }
        }, 1000)
    }, [])

   function handleClick(e){
    if (!selected) {
        var target = e.target
        var img_no = target.alt
        // setVotes(p => { p[img_no] += 1; return p })
        var r=Math.random()
        setVotes([Math.random()*50,Math.random()*20,Math.random()*40,Math.random()*80])
        setSelected(true)
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
                                styles={{
                                    path: {
                                        // Path color
                                        stroke: `#ff808c`
                                    },
                                    trail: {
                                        // Trail color
                                        stroke: '#eeeeee',
                                    }
                                }}>
                            <img src={imgurl + images[0]} alt="0" onClick={handleClick} onError={e=>e.target.src=loader} className={MainpageCSS.img} draggable="false" />
                        </CircularProgressbarWithChildren> 
                            
                        </div>
                    </div>
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <CircularProgressbarWithChildren value={votes[1]}
                                    styles={{
                                        path: {
                                            // Path color
                                            stroke: `#9180ff`
                                        },
                                        trail: {
                                            // Trail color
                                            stroke: '#eeeeee',
                                        }
                                    }}>
                                <img src={imgurl + images[1]} alt="1" onClick={handleClick} onError={e=>e.target.src=loader} className={MainpageCSS.img} draggable="false" />
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
                                    styles={{
                                        path: {
                                            // Path color
                                            stroke: `#84db92`
                                        },
                                        trail: {
                                            // Trail color
                                            stroke: '#eeeeee',
                                        }
                                    }}>
                                <img src={imgurl + images[2]} alt="2" onClick={handleClick} onError={e=>e.target.src=loader} className={MainpageCSS.img} draggable="false" />
                            </CircularProgressbarWithChildren> 
                        </div>
                    </div>
                    <div className="col-6">
                        <div className={MainpageCSS.imgdiv}>
                            <CircularProgressbarWithChildren value={votes[3]}
                                    styles={{
                                        path: {
                                            // Path color
                                            stroke: `#f2dc5e`
                                        },
                                        trail: {
                                            // Trail color
                                            stroke: '#eeeeee',
                                        }
                                    }}>
                                <img src={imgurl + images[3]} alt="3" onClick={handleClick} onError={e=>e.target.src=loader} className={MainpageCSS.img} draggable="false" />
                            </CircularProgressbarWithChildren> 
                        </div>
                    </div>
                </div>
                <p className={MainpageCSS.p}>Brain Wave</p>
            </div>
        </div>
    )
}

export default Mainpage
