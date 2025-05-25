import Image from 'next/image'
import React from 'react'
import { ContainerTextFlip } from './ui/container-text-flip';
import { BackgroundGradient } from './ui/background-gradient';



const words = ["Full Stack Developer", "Coding Nerd", "Problem Solver",];


const Hero = () => {
    return (
        <section className="w-full mt-40 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-52 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">

                {/* Left: Text Content */}
                <div className="text-center md:text-left flex flex-col gap-4 text-neutral-500 font-semibold text-3xl sm:text-3xl md:text-4xl dark:text-neutral-400 p-5">

                    <span className='flex items-center justify-center md:justify-start gap-2'>
                        👋🏻Hi, I&apos;m
                        <span className='dark:text-orange-500 text-orange-400 font-extrabold '>
                            Ayush
                        </span>
                    </span>
                    <span className="flex gap-2 items-center justify-center md:justify-start">
                        a&nbsp;
                        <ContainerTextFlip
                            textClassName="tracking-tight font-semibold"
                            animationDuration={700}
                            words={words}
                        />
                    </span>
                    from India.
                </div>

                {/* Right: Image */}
                <div className="flex justify-center md:justify-end">
                    <BackgroundGradient className="rounded-full">
                        <Image
                            src="/ayush.jpg"
                            alt="Hero Image"
                            width={300}
                            height={300}
                            className="rounded-full object-cover"
                        />
                    </BackgroundGradient>
                </div>
            </div>
        </section>
    )
}

export default Hero