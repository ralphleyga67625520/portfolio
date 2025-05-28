"use client"

import { motion } from "motion/react"
import React, { useState } from "react"
import { AceternityIcon, CSSIcon, ExpressIcon, GoLangIcon, GraphQLIcon, HTMLIcon, JavaIcon, JavaSciptIcon, MongoDBIcon, NextJsIcon, NodeJsIcon, PostgresIcon, PrismaIcon, ReactIcon, ShadCNIcon, TailwindIcon, TypeScriptIcon } from "./ui/icons"

interface Skill {
    name: string
    category: string
    icon: React.ReactNode
}

const skills: Skill[] = [
    // Programming Languages
    { name: "HTML", category: "Programming Languages", icon: <HTMLIcon/>},
    { name: "CSS", category: "Programming Languages", icon: <CSSIcon/>},
    { name: "JavaScript", category: "Programming Languages", icon: <JavaSciptIcon/> },
    { name: "TypeScript", category: "Programming Languages", icon: <TypeScriptIcon/> },
    { name: "Java", category: "Programming Languages", icon: <JavaIcon/> },
    { name: "Go", category: "Programming Languages", icon: <GoLangIcon/>},

    // Frontend
    { name: "React", category: "Frontend", icon: <ReactIcon/> },
    { name: "Next.js", category: "Frontend", icon:<NextJsIcon/> },
    { name: "AceternityUI", category: "Frontend", icon: <AceternityIcon/> },
    { name: "Tailwind CSS", category: "Frontend", icon: <TailwindIcon/> },
    { name: "ShadCN", category: "Frontend", icon: <ShadCNIcon/> },

    // Backend
    { name: "Node.js", category: "Backend", icon: <NodeJsIcon/> },
    { name: "Express.js", category: "Backend", icon: <ExpressIcon/> },
    { name: "PostgreSQL", category: "Backend", icon:<PostgresIcon/>},
    { name: "MongoDB", category: "Backend", icon: <MongoDBIcon/>},
    { name: "GraphQL", category: "Backend", icon: <GraphQLIcon/> },
    { name: "PrismaORM", category: "Backend", icon: <PrismaIcon/> },
]

const categories = ["All", "Programming Languages", "Frontend", "Backend"]

export default function Skills() {
    const [selectedCategory, setSelectedCategory] = useState("All")

    const filteredSkills =
        selectedCategory === "All" ? skills : skills.filter((skill) => skill.category === selectedCategory)

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
                duration: 0.4,
                ease: "easeOut",
            },
        },
    }

    return (
        <div id="skills" className=" transition-colors duration-300 mx-auto rounded-lg  flex flex-col gap-5 px-2 py-24 sm:px-10 md:px-20 lg:px-32">
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
                    transition={{ duration: 0.5, delay: 0.2 }}
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
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
                >
                    {filteredSkills.map((skill) => (
                        <motion.div
                            key={`${skill.name}-${selectedCategory}`}
                            variants={cardVariants}
                            className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md dark:shadow-gray-900/30 transition-all duration-300"
                            whileHover={{
                                scale: 1.03,
                                animation: "easeInOut",
                                transition: { duration: 0.2 },
                            }}
                        >
                            <div className="p-6">
                                <div className="flex items-center space-x-4">
                                    <motion.div
                                        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-2xl"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {skill.icon}
                                    </motion.div>
                                    <div>
                                        <h3 className="text-lg font-sans font-extrabold text-black dark:text-white">{skill.name}</h3>
                                        
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredSkills.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No skills found in this category.</p>
                    </motion.div>
                )}

                
                
            </div>
        </div>
    )
}
