import React, { Fragment } from 'react'

function LandingPageContent() {
    return (
        <Fragment >

            <section className='flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[2%] flex-wrap w-full shadow-2xl '>
                <div className='lg:w-1/2  w-full lg:h-80 container'>
                    <h1 className='lg:text-6xl text-4xl font-extrabold lg:mt-0 mt-10  font-ubuntu text-transparent tracking-normal 
                bg-clip-text bg-gradient-to-l from-purple-800 to-pink-900'>One app to control<span className='lg:text-5xl text-3xl'> and manage everything</span> </h1>
                    <p className='font-lily md:text-xl text-l mt-5'>Create a project and manage your team with just a single app .Create meetings , assign tasks .</p>
                </div>
                <div className='lg:w-1/2  w-full bg-yellow-500  '>
                    <img src="/pageContentRightImage.gif" alt="" srcset="" />
                </div>


            </section>
            <section className='flex items-center justify-center xl:max-w-7xl xl:mx-auto
             max-w-full px-[2%] flex-wrap w-full shadow-2xl p-5 bg-gradient-to-b from-purple-700 to-black'>
                <div className='lg:w-2/4  w-full'>
                    <h1 className='text-3xl font-bold font-logo lg:float-right text-center text-white'>Get started with Pheonix with </h1>
                </div>
                <div className='lg:w-2/4 w-full flex justify-center'>
                    <button className='bg-fuchsia-800 hover:bg-pink-800 text-white font-bold text-l py-3 px-6 rounded inline-flex items-center font-lily'>Register Here</button>
                </div>
            </section>
            <section className='container flex-wrap flex items-center justify-between xl:max-w-7xl xl:mx-auto
             max-w-full'>
                <div className='md:w-1/3 w-full'>
                <img src="./ContentPageGif2.avif" alt="" sizes="" srcset="" />
                </div>
                <div className='lg:w-1/4 w-full'>
                    <h1>About</h1>
                </div>
            </section>

        </Fragment>
    )
}

export default LandingPageContent