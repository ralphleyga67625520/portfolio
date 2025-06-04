"use client"

import { motion, useScroll, useSpring, useTransform } from "motion/react"
import React, { useRef, useState } from "react"
import {  CPPIcon, CSSIcon, ExpressIcon, GithubIcon, GitIcon, GoLangIcon, GraphQLIcon, HTMLIcon, JavaIcon, JavaSciptIcon, MongoDBIcon, NextJsIcon, NodeJsIcon, PostgresIcon, PostmanIcon, PrismaIcon, ReactIcon, ReduxIcon, TailwindIcon, TypeScriptIcon, DrizzleIcon, JWTIcon, MySQLIcon, AceternityIcon, ShadCNIcon } from "./ui/icons"

interface Skill {
    name: string
    category: string
    icon: React.ReactNode
}

const skills: Skill[] = [
    // Programming Languages
    { name: "JavaScript", category: "Programming Languages", icon: <JavaSciptIcon /> },
    { name: "TypeScript", category: "Programming Languages", icon: <TypeScriptIcon /> },
    {name: "C++",category:"Programming Languages", icon: <CPPIcon/>},
    { name: "Java", category: "Programming Languages", icon: <JavaIcon /> },
    { name: "Go", category: "Programming Languages", icon: <GoLangIcon /> },
    
    // Frontend
    { name: "HTML", category: "Frontend", icon: <HTMLIcon /> },
    { name: "CSS", category: "Frontend", icon: <CSSIcon /> },
    { name: "Tailwind CSS", category: "Frontend", icon: <TailwindIcon /> },
    { name: "React", category: "Frontend", icon: <ReactIcon /> },
    { name: "Next.js", category: "Frontend", icon: <NextJsIcon /> },
    { name: "Redux", category: "Frontend", icon: <ReduxIcon /> },

    // Backend
    { name: "Node.js", category: "Backend", icon: <NodeJsIcon /> },
    { name: "Express.js", category: "Backend", icon: <ExpressIcon /> },
    { name: "Next.js", category: "Backend", icon: <NextJsIcon /> },
    { name: "GraphQL", category: "Backend", icon: <GraphQLIcon /> },
    { name: "JWT", category: "Backend", icon: <JWTIcon /> },

    // Databases
    { name: "PostgreSQL", category: "Databases", icon: <PostgresIcon /> },
    { name: "MySQL", category: "Databases", icon: <MySQLIcon /> },

    { name: "MongoDB", category: "Databases", icon: <MongoDBIcon /> },
    { name: "Prisma", category: "Databases", icon: <PrismaIcon /> },
    { name: "Drizzle", category: "Databases", icon: <DrizzleIcon /> },

    //Tools
    { name: "Git", category: "Tools & Platforms", icon: <GitIcon /> },
    { name: "GitHub", category: "Tools & Platforms", icon: <GithubIcon /> },
    { name: "Postman", category: "Tools & Platforms", icon: <PostmanIcon /> },
    { name: "Aceternity", category: "Tools & Platforms", icon: <AceternityIcon /> },
    { name: "ShadCN", category: "Tools & Platforms", icon: <ShadCNIcon /> },
]

const categories = ["All", "Programming Languages", "Frontend", "Backend", "Databases", "Tools & Platforms"]

export default function Skills() {
    const [selectedCategory, setSelectedCategory] = useState("All")

    let filteredSkills: Skill[];

    if (selectedCategory === "All") {
        const uniqueSkills: Skill[] = [];
        const addedNames: string[] = [];

        for (const skill of skills) {
            if (!addedNames.includes(skill.name)) {
                uniqueSkills.push(skill);
                addedNames.push(skill.name); // mark this name as added
            }
        }

        filteredSkills = uniqueSkills;
    } else {
        filteredSkills = skills.filter((skill) => skill.category === selectedCategory);
    }



    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    }

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
    }
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


    return (
        <motion.section
            ref={ref}
            style={{ y: translateContent }}
            id="skills" className=" transition-colors duration-300 mx-auto rounded-lg  flex flex-col gap-5 px-2 py-24 sm:px-10 md:px-20 lg:px-32">
            <div className=" mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl sm:text-5xl md:text-4xl lg:text-4xl font-sans font-bold text-center">Technical Skills</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-md">Technologies and frameworks I work with</p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-bold font-sans cursor-pointer transition-all duration-300 ${selectedCategory === category
                                ? "bg-black dark:bg-neutral-700 text-white dark:text-white"
                                : " dark:bg-none dark:hover:bg-neutral-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200"
                                }`}


                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6  min-h-[400px]"
                >
                    {filteredSkills.map((skill) => (
                        <motion.div
                            key={`${skill.name}-${selectedCategory}`}
                            variants={cardVariants}
                            className="rounded-xl overflow-hidden dark:shadow-gray-900/30 transition-all duration-300"

                        >
                            <div className="p-4">
                                <div className="flex md:flex-col items-center gap-4 sm:gap-6">
                                    <motion.div
                                        className="flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full text-xl sm:text-2xl lg:text-3xl"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {skill.icon}
                                    </motion.div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-md sm:text-sm md:text-base lg:text-lg font-bold text-black dark:text-white">
                                            {skill.name}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>


            </div>
        </motion.section>
    )
}
