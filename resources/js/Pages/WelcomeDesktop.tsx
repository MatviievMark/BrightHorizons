import { Link, Head } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';
import UnderlineSvg from '@/Components/Svg/UnderlineSvg';
import SparksSvg from '@/Components/Svg/SparksSvg';
import LeafSvg from '@/Components/Svg/LeafSvg';
import ArrowSvg from '@/Components/Svg/ArrowSvg';
import CircleSvg from '@/Components/Svg/CircleSvg';
import SmileySvg from '@/Components/Svg/SmileySvg';
import LinesSvg from '@/Components/Svg/LinesSvg';
import DoubleCircleSvg from '@/Components/DoubleCircleSvg';
import BearStockSvg from '@/Components/Svg/BearStockSvg';
import StarsSvg from '@/Components/Svg/StarsSvg';
import CTAArrows from '@/Components/Svg/CTAArrows';

interface Props {
    auth: {
        user: any;
    };
}

export default function WelcomeDesktop({ auth }: Props) {
    return (
        <div className="relative min-h-screen bg-white font-sans overflow-x-hidden">
            <Navigation />
            {/* Grid Background */}
            <div className="absolute inset-0" style={{
                backgroundImage: `
                    linear-gradient(to right, #E5E7EB 1px, transparent 1px),
                    linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)
                `,
                backgroundSize: '1.25rem 1.25rem'
            }}></div>

            {/* Slanted Blue Background */}
            <div className="absolute top-0 left-0 w-full" style={{ height: '55rem' }}>
                <div 
                    className="absolute top-0 left-0 w-[200%] h-full bg-light-blue transform -skew-y-[-10deg] translate-y-[-25%] translate-x-[-25%]"
                    style={{ zIndex: 0 }}
                ></div>
            </div>

            {/* Hero Content Container */}
            <div className='relative z-10 px-8 pt-32 h-[45rem]'>
                <div className='max-w-3xl mx-auto text-center'>
                    <h1 className='text-[5rem] font-extrabold text-primary leading-tight mb-12'>
                        Master the Language
                        <br />
                        <span className="relative inline-block">
                            Of Math
                            <UnderlineSvg className="absolute -bottom-6 left-1/2 -translate-x-[25%] w-64" />
                        </span>
                    </h1>
                    <button className="bg-purple text-white h-[4rem] w-[16rem] rounded-full text-[1.5rem] font-extrabold hover:bg-opacity-90 transition-colors">
                        BOOK SESSION
                    </button>
                </div>
            </div>

            {/* Meet Max Section */}
            <div className='relative z-10 px-8 pt-[5rem]'>
                <div className='relative w-full max-w-6xl mx-auto flex justify-center items-start'>
                    {/* Meet Max text */}
                    <div className='absolute right-[-8em] top-[25rem]'>
                        <div className='text-[8rem] font-extrabold text-primary transform -rotate-[-90deg] tracking-[-0.02em] whitespace-nowrap'>
                            Meet Max
                        </div>
                    </div>

                    <div className='flex flex-col items-center'>
                        {/* Large Circle */}
                        <div className='absolute top-[-4rem] left-[20em] w-[15rem] h-[15rem] overflow-x-hidden'>
                            <div className='w-full h-full rounded-full bg-blue'></div>
                        </div>
                        {/* Circle Image Placeholder */}
                        <div className='relative w-[18rem] h-[18rem] rounded-full bg-gray-200 mb-12'>
                            <SparksSvg className="absolute -top-[3rem] -right-[5rem] -rotate-[-10deg] w-40" />
                            {/* Image Goes Here */}
                        </div>

                        {/* Content */}
                        <div className='max-w-xl -mt-4'>
                            <p className='text-[1.2rem] text-primary mb-[2rem] leading-relaxed font-medium tracking-[-0.01em] text-left'>
                                With over 8 years of experience teaching mathematics, Max specializes in making complex concepts clear and engaging
                                With over 8 years of experience teaching mathematics, Max specializes in making complex concepts clear and engaging
                                With over 8 years of experience teaching mathematics, Max specializes in making complex concepts clear and engaging
                            </p>

                            {/* Credentials */}
                            <div className='space-y-6'>
                                <div className='bg-grey py-6 px-8 rounded-lg flex items-center w-full'>
                                    <div className='w-2 h-10 bg-primary'></div>
                                    <div className='ml-6'>
                                        <h3 className='font-bold text-[1.125rem] text-primary tracking-[-0.02em]'>FL Certified Math Teacher</h3>
                                        <p className='text-gray-600 text-[1rem] tracking-[0.02em]'>Secondary Mathematics</p>
                                    </div>
                                </div>

                                <div className='bg-grey py-6 px-8 rounded-lg flex items-center w-full'>
                                    <div className='w-2 h-10 bg-primary'></div>
                                    <div className='ml-6'>
                                        <h3 className='font-bold text-[1.3rem] text-primary tracking-[-0.01em]'>Master's in Finance</h3>
                                        <p className='text-gray-600 text-[1rem] tracking-[0.02em]'>University of Florida</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div>
            </div>

            {/* Journey To Mastery Section */}
            <div className='relative z-10 px-8 pt-[20rem]'>
                {/* Slanted Blue Background for Journey to Mastery */}
                <div className="absolute left-0 right-0 w-full h-[62rem]">
                    <div 
                        className="absolute w-[200%] h-full bg-light-blue transform skew-y-[-9deg] translate-y-[-10%] -translate-x-[25%]"
                        style={{ zIndex: 0 }}
                    ></div>
                </div>
                <div className='max-w-3xl mx-auto relative z-10'>
                    <div className="relative text-center">
                        <h2 className='text-[4rem] font-extrabold text-primary leading-tight mb-[2rem] pt-8'>
                            Journey to Mastery
                            <CircleSvg className="absolute -bottom-[2rem] -right-[-3.5rem] w-[20rem]" />
                        </h2>
                    </div>
                    <SmileySvg className="absolute -top-[-5rem] -right-[5rem] w-[10rem]" />
                    {/* Journey Cards */}
                    <div className="space-y-8 pt-6 flex flex-col items-center">
                        {/* Quick Start Section */}
                        <div className="relative w-full flex justify-center">
                            <span className="absolute -left-[-10rem] top-[-0.5rem] text-[6rem] font-commissioner font-extrabold text-blue">1</span>
                            <div className="relative">
                                <h3 className="text-[2rem] font-bold text-primary mb-3 ml-12">Quick Start</h3>
                                <div className="bg-blue backdrop-blur-sm rounded-3xl p-6 shadow-card w-[32rem]">
                                    <p className="text-primary text-[1.125rem] mb-4 tracking-[-0.01em] leading-relaxed">15-minute assessment to pinpoint your current level</p>
                                    <div className="flex space-x-12">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 rounded-full bg-purple"></div>
                                            <span className="text-primary text-[1rem]">Diagnostic Test</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 rounded-full bg-purple"></div>
                                            <span className="text-primary text-[1rem]">Instant Results</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Your Path Section */}
                        <div className="relative w-full flex justify-center">
                            <span className="absolute -left-[-10rem] top-[-0.5rem] text-[6rem] font-commissioner font-extrabold text-grey">2</span>
                            <div className="relative">
                                <h3 className="text-[2rem] font-bold text-primary mb-3 ml-12">Your Path</h3>
                                <div className="bg-grey backdrop-blur-sm rounded-3xl p-6 shadow-card w-[32rem]">
                                    <p className="text-primary text-[1.125rem] mb-4 tracking-[-0.01em] leading-relaxed">AI-powered learning path tailored to your goals</p>
                                    <div className="flex space-x-12">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 rounded-full bg-purple"></div>
                                            <span className="text-primary text-[1rem]">Custom Modules</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 rounded-full bg-purple"></div>
                                            <span className="text-primary text-[1rem]">Smart Pacing</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Track Growth Section */}
                        <div className="relative w-full flex justify-center">
                            <span className="absolute -left-[-10rem] top-[-0.5rem] text-[6rem] font-commissioner font-extrabold text-blue">3</span>
                            <div className="relative">
                                <h3 className="text-[2rem] font-bold text-primary mb-3 ml-12">Track Growth</h3>
                                <div className="bg-blue backdrop-blur-sm rounded-3xl p-6 shadow-card w-[32rem]">
                                    <p className="text-primary text-[1.125rem] mb-4 tracking-[-0.01em] leading-relaxed">Monitor progress with detailed analytics</p>
                                    <div className="flex space-x-12">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 rounded-full bg-purple"></div>
                                            <span className="text-primary text-[1rem]">Progress Reports</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 rounded-full bg-purple"></div>
                                            <span className="text-primary text-[1rem]">Skill Mastery</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Arrows */}
                        <LeafSvg className="absolute -top-[-17rem] -right-[-7rem] w-32" />
                        <ArrowSvg className="absolute -top-[-29rem] -right-[-6rem] w-32" />
                        <ArrowSvg className="absolute -top-[-29rem] -right-[-6rem] w-32" />
                    </div>
                </div>
            </div>

            {/* Investment Plans Section */}
            <div className='relative z-10 px-8 pt-32 pb-40'>
                {/* Title */}
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-center">
                        <h2 className="text-[4.5rem] whitespace-nowrap font-extrabold text-primary transform -rotate-[9deg] mb-[7rem] mt-[8rem]">
                            Investment Plans
                        </h2>
                    </div>
            
                    {/* Pricing Cards */}
                    <div className="flex flex-row items-center justify-center space-x-8 py-16">
                        {/* Online 1-on-1 */}
                        <div className="relative">
                            <LinesSvg className="absolute -left-[3rem] -top-[3rem] w-[25rem] -z-10" />
                            <div className="bg-grey backdrop-blur-sm rounded-3xl p-8 shadow-card w-[18rem]">
                                <h3 className="text-[1.3rem] font-bold text-primary mb-2">Online 1-on-1</h3>
                                <div className="text-[1.8rem] font-bold text-primary mb-6">$40/hour</div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 rounded-full bg-purple"></div>
                                        <span className="text-primary text-[1rem]">Flexible scheduling</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 rounded-full bg-purple"></div>
                                        <span className="text-primary text-[1rem]">Virtual whiteboard</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 10-Hour Package */}
                        <div className="bg-primary backdrop-blur-sm rounded-3xl p-8 shadow-card w-[19rem]">
                            <h3 className="text-[1.3rem] font-bold text-white mb-2">10-Hour Package</h3>
                            <div className="text-[1.8rem] font-bold text-white mb-6">$350</div>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 rounded-full bg-blue"></div>
                                    <span className="text-white text-[1rem]">Most Popular Choice</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 rounded-full bg-blue"></div>
                                    <span className="text-white text-[1rem]">Save $50</span>
                                </div>
                                <BearStockSvg className="absolute -top-[4.5rem] -right-[-6rem] w-32" />
                            </div>
                        </div>
                        <CTAArrows className="absolute  -top-[-42rem] w-[10rem] h-[10rem] -rotate-[120deg]" />


                        {/* In-Person */}
                        <div className="relative">
                            <DoubleCircleSvg className="absolute -left-[-10rem] -top-[10rem] w-[15rem]" />
                            <div className="bg-grey backdrop-blur-sm rounded-3xl p-8 shadow-card w-[18rem]">
                                <h3 className="text-[1.3rem] font-bold text-primary mb-2">In-Person</h3><script type="module" src=""></script>
                                <div className="text-[1.8rem] font-bold text-primary mb-6">$50/hour</div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 rounded-full bg-purple"></div>
                                        <span className="text-primary text-[1rem]">Jacksonville area only</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 rounded-full bg-purple"></div>
                                        <span className="text-primary text-[1rem]">2-hour minimum</span>
                                    </div>
                                </div>
                                <StarsSvg className="absolute -bottom-[8rem] -right-[5rem] w-32" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className='relative z-10 px-8 py-16 mt-24 bg-grey'>
                <div className='max-w-3xl mx-auto'>
                    <div className='flex justify-between items-center'>
                        {/* Logo/Brand */}
                        <div className='text-primary font-extrabold text-2xl'>
                            Bright Horizons
                        </div>

                        {/* Contact */}
                        <div className='text-right'>
                            <p className='text-primary font-medium text-lg mb-6'>Ready to excel in math?</p>
                            <button className='bg-purple text-white px-12 py-3 rounded-full text-lg font-bold hover:bg-opacity-90 transition-colors'>
                                Contact Max
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='h-px bg-primary/10 my-12'></div>

                    {/* Bottom Section */}
                    <div className='flex justify-between items-center text-base text-primary/60'>
                        <div>© 2024 Bright Horizons. All rights reserved.</div>
                        <div>
                            <a href="#" className='hover:text-primary transition-colors'>Privacy Policy</a>
                            <span className='mx-6'>|</span>
                            <a href="#" className='hover:text-primary transition-colors'>Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 