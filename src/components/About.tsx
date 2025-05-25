'use client'
import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import TextGenerateEffect from './ui/text-generate-effect'

const About = () => {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    })

    const translateContent = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), {
        stiffness: 120,
        damping: 24,
        mass: 0.8,
    })

    const opacityContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

    return (
        <motion.div
            ref={ref}
            style={{ opacity: opacityContent, y: translateContent }}
            id="about"
            className="mx-auto border rounded-lg border-orange-100/25 flex flex-col gap-5 px-6 py-20 sm:px-10 md:px-20 lg:px-32 "
        >
            <h1 className="text-3xl sm:text-5xl md:text-4xl lg:text-5xl font-sans font-bold text-center underline underline-offset-8">
                About Me
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-18 py-10">
                <div className="md:block hidden scale-125">
                    <DotLottieReact
                        src="https://lottie.host/46ab6c13-c04f-4c3a-85b7-7422db5fe2ab/3rXet8qbCi.lottie"
                        loop
                        autoplay
                    />
                </div>

                <span className="font-sans text-neutral-700 dark:text-neutral-300 font-semibold text-lg sm:text-base md:text-lg lg:text-2xl leading-relaxed text-justify">
                    <TextGenerateEffect text="I'm a Full-Stack Developer with a strong focus on backend development, API design, and building scalable systems. I enjoy solving real-world problems through clean, maintainable code and robust logic. While I often rely on modern UI libraries to handle the frontend, my strength lies in making everything work reliably behind the scenes. I’m always exploring better ways to architect systems, integrate tools, and contribute to meaningful projects that make an impact." />
                </span>
            </div>
        </motion.div>
    )
}

export default About
