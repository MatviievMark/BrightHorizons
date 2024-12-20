import { Link, Head } from '@inertiajs/react';
import UnderlineSvg from '@/Components/UnderlineSvg';

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
        </div>
    );
}
