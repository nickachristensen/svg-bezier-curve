'use client'

import { useRef, useEffect } from 'react'
import styles from './page.module.css'

export default function Home() {
  const path = useRef(null);
  let progress = 0;
  let reqId = null;
  let x = 0.5;
  
    useEffect(() => {
      setPath(progress);
      window.addEventListener('resize', () => {
        setPath(progress);
      })
    }, [])
  
    const setPath = (value) => {
      const width = window.innerWidth * 0.7;
      path.current.setAttributeNS(null, "d", `M 0 50 Q ${width * x} ${50 + value} ${width} 50`)
    }

    let time = Math.PI / 2;
    
    const animateIn = () => {
        //if the animationOut is running, cancel it and reset time
        if(reqId){
          cancelAnimationFrame(reqId);
          time = Math.PI / 2;
        }
        setPath(progress);
        reqId = requestAnimationFrame(animateIn);
    }
    
    const resetAnimation = () => {
        cancelAnimationFrame(reqId)
        animateOut();
      }
    
    const lerp = (x, y, a) => x * (1 - a) + y * a;
    
    const animateOut = () => {
        let newProgress = progress * Math.sin(time);
        setPath(newProgress)
    
        progress = lerp(progress, 0, .04);
        time+=0.2;
    
        if(Math.abs(progress) > 0.5){
          reqId = requestAnimationFrame(animateOut)
        }
        //If the slope is almost flat, we stop the animation
        else{
          time = Math.PI / 2;
          progress = 0;
        }
    }

    const manageMouseMove = (e) => {
        const { movementY } = e;
        const box = e.target.getBoundingClientRect();
        x = (e.clientX - box.left) / box.width;
        progress += movementY;
    }
  
    return (
      <div className={styles.container}>
          <div className={styles.body}>
              <div className={styles.line}>
                <span onMouseEnter={() => {animateIn()}} onMouseLeave={() => {resetAnimation()}} onMouseMove={(e) => {manageMouseMove(e)}} className={styles.box}></span>
                <svg>
                  <path ref={path}></path>
                </svg>
              </div>
              <div className={styles.description}>
                <p>Smart Development</p>
                <p>Combining unique design and rich technology, we build digital products exactly as they were designed, without shortcuts or simplifications.</p>
              </div>
              <div className={styles.tagsContainer}>
                <p>Areas</p>
                <div className={styles.tags}>
                  <p>E-commerce</p>
                  <p>Finance</p>
                  <p>Education</p>
                  <p>Social</p>
                  <p>Entertainment</p>
                  <p>Medicine</p>
                </div>
              </div>
          </div>
      </div>
    )
}
