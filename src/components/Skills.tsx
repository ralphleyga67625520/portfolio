import React from 'react'
import { HTMLIcon, JavaSciptIcon } from './ui/icons'

const Skills = () => {
    return (
        <div className='dark:text-white bg-amber-500 mx-auto rounded-lg  flex flex-col gap-5 px-2 py-20 sm:px-10 md:px-20 lg:px-28 '>
            <h1 className="text-3xl sm:text-5xl md:text-4xl lg:text-4xl font-sans font-bold text-center underline underline-offset-8">
                Skills
            </h1>
            {
                Icons.map((skill, index) => (
                    <div key={index} className="flex items-center justify-center gap-4">
                        <span className=" h-10 w-10 ">{skill.icon}</span>
                        <span className="text-lg font-semibold">{skill.name}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default Skills

interface Skill{
    name: string,
    icon: React.ReactNode
}

const Icons:Skill[] = [
    {
        name: "JavaScript",
        icon: <JavaSciptIcon/>
    },
    {
        name:"HTML",
        icon: <HTMLIcon/>
    }
]