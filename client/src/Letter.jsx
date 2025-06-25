
import { useEffect, useState, useRef } from 'react'
import ClosedMail from './assets/ClosedMail.svg?react'
import OpenMail from './assets/OpenMail.svg?react'
import Edit from './assets/Edit.png'
import TrashCan from './assets/TrashCan.png'

function Letter (props){
    const animatedOpen = useRef(null)
    const [animationSet,setAnimationSet] = useState(0)
    const onAnimationEnd = () => {
        if(animationSet >= 1) {
            props.endAnimation()
        }
        setAnimationSet(animationSet+1); 
    }

    return <div ref={animatedOpen} className={`letterparent ${props.state === 'animated' ? animationSet == 0 ? 'mail-send-start' : 'mail-send' : ''}`} onAnimationEnd={onAnimationEnd}>
            {props.state === 'open' || (props.state === 'animated' && animationSet == 0) ? <OpenMail style={{color:props.color || '#000000'}} className='letter'/> : ''}
            {props.state === 'closed' || (props.state === 'animated' && animationSet == 1) ? <ClosedMail style={{color:props.color || '#000000'}} className={'letter'}/> : ''}
            <p className='openwhentext'>Open When</p>
            <p className='whattext'>{props.when ?? 'You want to!'}</p>
            {props.onedit ? <img src={Edit} className='edit-button' onClick={() => {props.onedit(props.id)}}></img> : ''}
            {props.ondelete ? <img src={TrashCan} className='trash-button' onClick={() => {props.ondelete(props.id)}}></img> : ''}
        </div>
}

export default Letter