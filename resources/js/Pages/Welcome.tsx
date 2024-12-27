import { Link, Head } from '@inertiajs/react';
import UnderlineSvg from '@/Components/UnderlineSvg';
import SparksSvg from '@/Components/SparksSvg';

interface Props {
    auth: {
        user: any;
    };
}

export default function Welcome({ auth }: Props) {
    return (
        <div className="relative min-h-screen bg-white font-sans overflow-x-hidden">
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
            <div className='absolute top-[9rem] right-[-7rem] w-[15.313rem] h-[16rem] overflow-x-hidden'>
                <div className='w-full h-full rounded-full bg-blue'></div>
            </div>

            {/* Hero Content Container */}
            <div className='relative z-10 px-8 pt-20'>
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
                    <div className='absolute -right-10 '>
                        <div className='mb-14'></div>
                        <div className='text-[6.25rem] font-extrabold text-primary writing-mode-vertical transform rotate-180 tracking-[-0.02em]' style={{ writingMode: 'vertical-rl' }}>
                            Meet Max
                        </div>
                    </div>

                    <div className='max-w-3xl'>
                        {/* Large Circle */}
                        <div className='absolute top-[-4rem] right-[13em] w-[19rem] h-[19rem] overflow-x-hidden'>
                            <div className='w-full h-full rounded-full bg-blue'></div>
                        </div>
                        {/* Circle Image Placeholder */}
                        <div className='relative w-[17.5rem] h-[17.5rem] rounded-full bg-gray-200 mb-8'>
                            <SparksSvg className="absolute -top-[3.8rem] -right-[3.5rem]" />
                            {/* Image Goes Here */}
                        </div>

                        {/* Content */}
                        <div className='max-w-[19.375rem] -mt-4'>
                            <p className='text-[1.313rem] text-primary mb-8 leading-[1.875rem] font-medium tracking-[-0.01em]'>
                                With over 8 years of experience teaching mathematics, Max specializes in making complex concepts clear and engaging
                            </p>

                            {/* Credentials */}
                            <div className='space-y-3'>
                                <div className='bg-grey py-4 pr-6 rounded-lg flex items-center w-[277px] h-[55px]'>
                                    <div className='w-1.5 h-[3.438rem] bg-primary'></div>
                                    <div className='ml-4'>
                                        <h3 className='font-bold text-[1.125rem] text-primary'>FL Certified Math Teacher</h3>
                                        <p className='text-gray-600 text-[0.85rem]'>Secondary Mathematics</p>
                                    </div>
                                </div>

                                <div className='bg-grey py-4 pr-6 rounded-lg flex items-center w-[277px] h-[55px]'>
                                    <div className='w-1.5 h-[3.438rem] bg-primary'></div>
                                    <div className='ml-4'>
                                        <h3 className='font-bold text-[1.125rem] text-primary'>Master's in Finance</h3>
                                        <p className='text-gray-600 text-[0.85rem]'>University of Florida</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Journey to text */}
                    <div className='mt-32'>
                        <h2 className='text-[5rem] font-extrabold text-primary leading-tight'>
                            Journey to
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
