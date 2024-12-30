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

export default function Welcome({ auth }: Props) {
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
            <div className="absolute top-0 left-0 w-full h-[35rem] overflow-x-hidden">
                <div 
                    className="absolute top-0 left-0 w-full h-full bg-light-blue transform -skew-y-[-9deg] translate-y-[-10%]"
                    style={{ zIndex: 0 }}
                ></div>
            </div>

            {/* Large Circle */}
            <div className='absolute top-[12rem] right-[-7rem] w-[15.313rem] h-[16rem] overflow-x-hidden'>
                <div className='w-full h-full rounded-full bg-blue'></div>
            </div>

            {/* Hero Content Container */}
            <div className='relative z-10 px-8 pt-28'>
                <div className='max-w-xl mx-auto'>
                    <h1 className='text-[3.5rem] font-extrabold text-primary leading-tight mb-8'>
                        Master the Language
                        <br />
                        <span className="relative">
                            Of Math
                            <UnderlineSvg className="absolute -bottom-4 left-12" />
                        </span>
                    </h1>
                    <button className="bg-purple text-white h-[3.5rem] w-[13.75rem] rounded-full text-[1.25rem] font-extrabold hover:bg-opacity-90 transition-colors">
                        BOOK SESSION
                    </button>
                </div>
            </div>

            {/* Meet Max Section */}
            <div className='relative z-10 px-8 pt-48'>
                <div className='relative w-full'>
                    {/* Meet Max vertical text */}
                    <div className='absolute -right-10'>
                        <div className='mb-14'></div>
                        <div className='text-[6.25rem] max-[390px]:text-[5.5rem] max-[375px]:text-[5rem] max-[320px]:text-[3.5rem] font-extrabold text-primary writing-mode-vertical transform rotate-180 tracking-[-0.02em]' style={{ writingMode: 'vertical-rl' }}>
                            Meet Max
                        </div>
                    </div>

                    <div className='max-w-[430px] md:max-w-3xl'>
                        {/* Large Circle */}
                        <div className='absolute top-[-4rem] right-[13em] w-[19rem] h-[19rem] overflow-x-hidden'>
                            <div className='w-full h-full rounded-full bg-blue'></div>
                        </div>
                        {/* Circle Image Placeholder */}
                        <div className='relative w-[17.5rem] max-[390px]:w-[16rem] max-[375px]:w-[14rem] max-[320px]:w-[12rem] h-[17.5rem] max-[390px]:h-[16rem] max-[375px]:h-[14rem] max-[320px]:h-[12rem] rounded-full bg-gray-200 mb-8 max-[375px]:mb-6'>
                            <SparksSvg className="absolute -top-[3.8rem] -right-[3.5rem] max-[390px]:-top-[3.4rem] max-[390px]:-right-[3.2rem] max-[390px]:w-28 max-[375px]:-top-[3rem] max-[375px]:-right-[2.8rem] max-[375px]:w-24 max-[320px]:-top-[2.5rem] max-[320px]:-right-[2.5rem] max-[320px]:w-20" />
                            {/* Image Goes Here */}
                        </div>

                        {/* Content */}
                        <div className='max-w-[19.375rem] max-[390px]:max-w-[17rem] max-[375px]:max-w-[16rem] max-[320px]:max-w-[14rem] -mt-4'>
                            <p className='text-[1.313rem] max-[390px]:text-[1.2rem] max-[375px]:text-[1.1rem] max-[320px]:text-[1rem] text-primary mb-8 leading-[1.875rem] max-[390px]:leading-[1.7rem] max-[375px]:leading-[1.6rem] max-[320px]:leading-[1.4rem] font-medium tracking-[-0.01em]'>
                                With over 8 years of experience teaching mathematics, Max specializes in making complex concepts clear and engaging
                            </p>

                            {/* Credentials */}
                            <div className='space-y-3'>
                                <div className='bg-grey py-4 max-[390px]:py-3.5 max-[375px]:py-3 pr-6 max-[390px]:pr-5 max-[375px]:pr-4 rounded-lg flex items-center w-[277px] max-[390px]:w-[260px] max-[375px]:w-full h-[55px] max-[390px]:h-[52px] max-[375px]:h-[48px] max-[320px]:h-[45px]'>
                                    <div className='w-1.5 h-[3.438rem] max-[390px]:h-[3.2rem] max-[375px]:h-[3rem] max-[320px]:h-[2.8rem] bg-primary'></div>
                                    <div className='ml-4'>
                                        <h3 className='font-bold text-[1.125rem] max-[390px]:text-[1.05rem] max-[375px]:text-[1rem] text-primary tracking-[-0.02em]'>FL Certified Math Teacher</h3>
                                        <p className='text-gray-600 text-[0.85rem] max-[390px]:text-[0.8rem] max-[375px]:text-[0.75rem] tracking-[0.02em]'>Secondary Mathematics</p>
                                    </div>
                                </div>

                                <div className='bg-grey py-4 max-[390px]:py-3.5 max-[375px]:py-3 pr-6 max-[390px]:pr-5 max-[375px]:pr-4 rounded-lg flex items-center w-[277px] max-[390px]:w-[260px] max-[375px]:w-full h-[55px] max-[390px]:h-[52px] max-[375px]:h-[48px] max-[320px]:h-[45px]'>
                                    <div className='w-1.5 h-[3.438rem] max-[390px]:h-[3.2rem] max-[375px]:h-[3rem] max-[320px]:h-[2.8rem] bg-primary'></div>
                                    <div className='ml-4'>
                                        <h3 className='font-bold text-[1.125rem] max-[390px]:text-[1.05rem] max-[375px]:text-[1rem] text-primary tracking-[-0.02em]'>Master's in Finance</h3>
                                        <p className='text-gray-600 text-[0.85rem] max-[390px]:text-[0.8rem] max-[375px]:text-[0.75rem] tracking-[0.02em]'>University of Florida</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div>
            </div>

            
            {/* Journey To Mastery Section */}
            <div className='relative z-10 px-8 pt-24'>
                {/* Slanted Blue Background for Journey to Mastery */}
                <div className="absolute left-0 w-full h-[62rem] overflow-x-hidden">
                    <div 
                        className="absolute w-full h-full bg-light-blue transform skew-y-[-9deg] translate-y-[-10%]"
                        style={{ zIndex: 0 }}
                    ></div>
                </div>
                <div className='max-w-xl mx-auto relative z-10'>
                    <div className="relative">
                        <h2 className='text-[3.125rem] font-extrabold text-primary leading-tight mb-8 pt-12 ml-[1.2rem]'>
                            Journey to Mastery
                            <CircleSvg className="absolute -bottom-[2rem] -right-[-6.5rem] max-[390px]:-right-[-3.5rem] -z-10" />
                            <SmileySvg className="absolute -bottom-[0rem] -right-[-0.5rem] max-[390px]:-right-[1rem]" />
                        </h2>
                    </div>
                    
                    {/* Journey Cards */}
                    <div className="space-y-8 pt-10">
                        {/* Quick Start Section */}
                        <div className="relative">
                            <span className="absolute -left-[-2rem] -top-12 text-[6rem] font-commissioner font-extrabold text-blue">1</span>
                            <div className="relative">
                                <h3 className="text-[1.563rem] font-bold text-primary mb-2 ml-12">Quick Start</h3>
                                <div className="bg-blue backdrop-blur-sm rounded-3xl p-5 shadow-card">
                                    <p className="text-primary text-[1.063rem] mb-4 tracking-[-0.01em] leading-[1.188rem]">15-minute assessment to pinpoint your current level</p>
                                    <div className="flex space-x-8">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-purple"></div>
                                            <span className="text-primary text-[0.9rem]">Diagnostic Test</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-purple"></div>
                                            <span className="text-primary text-[0.9rem]">Instant Results</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Your Path Section */}
                        <div className="relative">
                            <span className="absolute -left-[-2rem] -top-12 text-[6rem] font-commissioner font-extrabold text-grey">2</span>
                            <div className="relative">
                                <h3 className="text-[1.563rem] font-bold text-primary mb-2 ml-12">Your Path</h3>
                                <div className="bg-grey backdrop-blur-sm rounded-3xl p-5 shadow-card">
                                    <p className="text-primary text-[1.063rem] mb-4 tracking-[-0.01em] leading-[1.188rem]">AI-powered learning path tailored to your goals</p>
                                    <div className="flex space-x-8">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-purple"></div>
                                            <span className="text-primary text-[0.9rem]">Custom Modules</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-purple"></div>
                                            <span className="text-primary text-[0.9rem]">Smart Pacing</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Track Growth Section */}
                        <div className="relative">
                            <span className="absolute -left-[-2rem] -top-12 text-[6rem] font-commissioner font-extrabold text-blue">3</span>
                            <div className="relative">
                                <h3 className="text-[1.563rem] font-bold text-primary mb-2 ml-12">Track Growth</h3>
                                <div className="bg-blue backdrop-blur-sm rounded-3xl p-5 shadow-card">
                                    <p className="text-primary text-[1.063rem] mb-4 tracking-[-0.01em] leading-[1.188rem]">15-minute assessment to pinpoint your current level</p>
                                    <div className="flex space-x-8">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-purple"></div>
                                            <span className="text-primary text-[0.9rem]">Diagnostic Test</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-purple"></div>
                                            <span className="text-primary text-[0.9rem]">Instant Results</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Arrows */}
                        <LeafSvg className="absolute -top-[-21rem] -right-[1rem]" />
                        <ArrowSvg className="absolute -top-[-33rem] -right-[1rem]" />
                    </div>
                </div>
            </div>

            {/* Decorative Circle for Investment Plans */}
            <div className='absolute right-[-10rem] w-[23rem] h-[23rem] overflow-hidden' style={{ top: '121.5rem', zIndex: 0 }}>
                <div className='w-full h-full rounded-full bg-blue '></div>
            </div>

            {/* Investment Plans Section */}
            <div className='relative z-10 px-8 pt-24 pb-32'>
                {/* Title */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-[3.1rem] max-[390px]:text-[2.8rem] whitespace-nowrap font-extrabold text-primary transform -rotate-[9deg] mb-[7rem] mt-[3rem] ml-[-1.6rem]">
                        Investment Plans
                    </h2>
            
                    {/* Pricing Cards */}
                    <div className="flex flex-col items-center space-y-6">
                        {/* Online 1-on-1 */}
                        <div className="relative">
                            <LinesSvg className="absolute -left-[0rem] -top-[3rem] -z-10" />
                            <div className="bg-grey backdrop-blur-sm rounded-3xl p-6 shadow-card w-[15.5rem]">
                                <h3 className="text-[1.25rem] font-bold text-primary mb-1">Online 1-on-1</h3>
                                <div className="text-[1.5rem] font-bold text-primary mb-3">$40/hour</div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-purple"></div>
                                        <span className="text-primary text-[0.9rem]">Flexible scheduling</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-purple"></div>
                                        <span className="text-primary text-[0.9rem]">Virtual whiteboard</span>
                                    </div>
                                </div>
                                <BearStockSvg className="absolute top-[-3.3rem] right-[4rem]" />
                            </div>
                        </div>
                        <CTAArrows className="absolute -left-[-1rem] -top-[-25rem] w-24 h-40" />

                        {/* 10-Hour Package */}
                        <div className="bg-primary backdrop-blur-sm rounded-3xl p-6 shadow-card w-[16rem]">
                            <h3 className="text-[1.25rem] font-bold text-white mb-1">10-Hour Package</h3>
                            <div className="text-[1.5rem] font-bold text-white mb-3">$350</div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-blue"></div>
                                    <span className="text-white text-[0.9rem]">Most Popular Choice</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-blue"></div>
                                    <span className="text-white text-[0.9rem]">Save $50</span>
                                </div>
                            </div>
                        </div>

                        {/* In-Person */}
                        <div className="relative">
                            <DoubleCircleSvg className="absolute -left-[3.5rem] -top-[0rem] -z-10" />
                            <div className="bg-grey backdrop-blur-sm rounded-3xl p-6 shadow-card w-[15.5rem]">
                                <h3 className="text-[1.25rem] font-bold text-primary mb-1">In-Person</h3>
                                <div className="text-[1.5rem] font-bold text-primary mb-3">$50/hour</div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-purple"></div>
                                        <span className="text-primary text-[0.9rem]">Jacksonville area only</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-purple"></div>
                                        <span className="text-primary text-[0.9rem]">2-hour minimum</span>
                                    </div>
                                </div>
                                <StarsSvg className="absolute bottom-[-10rem] right-[-2rem]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Footer */}
            <div className='relative z-10 px-8 py-16 mt-24 bg-grey'>
                <div className='max-w-4xl mx-auto'>
                    <div className='flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0'>
                        {/* Logo/Brand */}
                        <div className='text-primary font-extrabold text-xl'>
                            Bright Horizons
                        </div>

                        {/* Contact */}
                        <div className='text-center md:text-right'>
                            <p className='text-primary font-medium mb-6'>Ready to excel in math?</p>
                            <button className='bg-purple text-white px-8 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-colors'>
                                Contact Max
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='h-px bg-primary/10 my-8'></div>

                    {/* Bottom Section */}
                    <div className='flex flex-col md:flex-row justify-between items-center text-sm text-primary/60'>
                        <div>© 2024 Bright Horizons. All rights reserved.</div>
                        <div className='mt-4 md:mt-0'>
                            <a href="#" className='hover:text-primary transition-colors'>Privacy Policy</a>
                            <span className='mx-4'>|</span>
                            <a href="#" className='hover:text-primary transition-colors'>Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
