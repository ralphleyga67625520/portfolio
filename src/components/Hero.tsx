import Image from 'next/image'
import React from 'react'
import { ContainerTextFlip } from './ui/container-text-flip';
import { BackgroundGradient } from './ui/background-gradient';



const words = ["Full Stack Developer", "Coding Nerd", "Problem Solver", ];

    
const Hero = () => {
    return (
        <section className='mt-20 w-full md:h-1/2 h-[500px] flex gap-10 items-center md:flex-row flex-col justify-between md:px-52 px-20 md:space-x-40 text-white'>
            <div className="h-[40rem] flex justify-center items-center px-4">
                <div className="md:text-4xl md:text-start text-center text-2xl mx-auto flex flex-col gap-4 text-neutral-400 font-semibold dark:text-neutral-400">
                    👋🏻Hi, I&apos;m Ayush
                    <span className=' flex gap-2 items-center'>
                        a&nbsp;
                        <ContainerTextFlip
                            textClassName='tracking-tight'
                            animationDuration={700}
                            words={words} />
                        
                    </span>
                        from India.
                </div>
            </div>
            
            <BackgroundGradient className="rounded-full flex-1">

                <Image
                    src="/ayush.jpg"
                    alt="Hero Image"
                    width={400}
                    height={400}
                    className='rounded-full'
                />

            </BackgroundGradient>

        </section>
    )
}

export default Hero