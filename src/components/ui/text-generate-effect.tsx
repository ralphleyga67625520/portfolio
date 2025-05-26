import { stagger } from 'motion'
import { useAnimate, motion, useInView } from 'motion/react'
import React, { useEffect } from 'react'

const TextGenerateEffect = ({ text }: { text: string }) => {
    const [scope, animate] = useAnimate()
    
    const isInView = useInView(scope, {  margin: '-100px' })
    useEffect(() => {
        if(isInView){

            startAnimation()
        }
    }, [isInView])

    const startAnimation = () => {
        animate(
            'span',
            {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
            },
            {
                duration: 0.5,
                ease: 'easeInOut',
                delay: stagger(0.02),
            }
        )
    }

    return (
        <div ref={scope} className="flex items-center flex-wrap w-full text-justify">
            {text.split(' ').map((word, index) => {
                if (word === 'Full-Stack' || word === 'Developer') {
                    const names = word.split(/(?=[A-Z])/)
                    return names.map((name, nameIndex) => (
                        <motion.span
                            key={`${index}-${nameIndex}`}
                            style={{
                                opacity: 0,
                                filter: 'blur(10px)',
                                y: 10,
                            }}
                            className={`text-orange-500 font-semibold text-lg scale-110 sm:text-xl md:text-xl lg:text-2xl mr-1  `}
                        >
                            {nameIndex === 0 ? (<>&nbsp;</>) : null}
                            {name}&nbsp;
                        </motion.span>
                    ))
                }

                return (
                    <motion.span
                        key={index}
                        style={{
                            opacity: 0,
                            filter: 'blur(10px)',
                            y: 10,
                        }}
                        className="tracking-tight mr-1"
                    >
                        {word}
                    </motion.span>
                )
            })}
        </div>
    )
}

export default TextGenerateEffect
