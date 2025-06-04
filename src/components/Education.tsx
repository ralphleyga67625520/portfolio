import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'

interface EducationItem {
    degree: string,
    startYear: number,
    endYear: number,
    institution: string
    institutionUrl: string
}

const educationItems: EducationItem[] = [
    {
        degree: "Bachelor of Technology in Computer Science and Engineering",
        startYear: 2023,
        endYear: 2027,
        institution: "Lovely Professional University, Jalandhar, Punjab - India",
        institutionUrl: 'https://maps.app.goo.gl/oYtu5bm8YLUJRTbB6'
    },
    {
        degree: "Secondary School",
        startYear: 2021,
        endYear: 2022,
        institution: "Jyoti Niketan School, Azamgarh, Uttar Pradesh - India",
        institutionUrl: 'https://maps.app.goo.gl/2GGL61eFZ1zoQeWz7'
    },
    {
        degree: "Higher Secondary School",
        startYear: 2020,
        endYear: 2021,
        institution: "Jyoti Niketan School, Azamgarh, Uttar Pradesh - India",
        institutionUrl: 'https://maps.app.goo.gl/2GGL61eFZ1zoQeWz7'
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
}

const Education = () => {
    return (
        <section id='education' className='py-20 px-4 sm:px-6 lg:px-8  transition-colors duration-300'>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-4">
                        Education
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        My academic journey
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    {educationItems.map((item, idx) => (
                        <motion.div key={idx} variants={itemVariants}>
                            <EducationCard {...item} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Education

const EducationCard = ({ startYear, endYear, degree, institution, institutionUrl }: EducationItem) => {
    return (
        <motion.div
            className="bg-gray-50 dark:bg-neutral-900/20 border border-gray-200 dark:border-gray-800 rounded-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-lg"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
        >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mb-2">
                        {degree}
                    </h3>
                </div>

                <div className="flex items-center space-x-2 w-fit bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full text-sm font-medium">
                    <Calendar className="w-fit h-fit" />
                    <span>{startYear} - {endYear}</span>
                </div>
            </div>

            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center">
                        <MapPin className="w-3 h-3 text-white dark:text-black" />
                    </div>
                </div>
                <div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed hover:underline underline-offset-4 cursor-pointer transition-all duration-300">
                        <Link href={institutionUrl} target="_blank" rel="noopener noreferrer">
                            {institution}
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
