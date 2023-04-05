import React, { Fragment } from 'react'

function LandingPageContent() {
    return (
        <Fragment >

            <section className='flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[2%] flex-wrap w-full shadow-2xl bg-white '>
                <div className='lg:w-1/2  w-full lg:h-80 container '>
                    <h1 className='lg:text-6xl text-4xl font-extrabold lg:mt-0 mt-10  font-ubuntu text-transparent tracking-normal 
                bg-clip-text bg-gradient-to-l from-purple-800 to-pink-900'>One app to control<span className='lg:text-5xl text-3xl'> and manage everything</span> </h1>
                    <p className='font-lily md:text-xl text-l mt-5'>Create a project and manage your team with just a single app .Create meetings , assign tasks .</p>
                </div>
                <div className='lg:w-1/2  w-full bg-yellow-500  '>
                    <img src="/pageContentRightImage.gif" alt="" srcset="" />
                </div>


            </section>
            <section className='flex items-center justify-center xl:max-w-7xl xl:mx-auto 
             max-w-full px-[2%] flex-wrap w-full shadow-2xl p-5 bg-gradient-to-t from-purple-600 to-black'>
                <div className='lg:w-2/4  w-full'>
                    <h1 className='text-xl font-bold font-ubuntu  lg:float-right text-center text-white'>Get started with Pheonix with </h1>
                </div>
                <div className='lg:w-2/4 w-full flex justify-center'>
                    <button className='bg-fuchsia-800 hover:bg-pink-800 text-white font-bold text-l py-2 px-6 rounded inline-flex items-center font-logo'>
                        <svg
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className='w-7 h-7 mr-3'
                            viewBox="0 0 363.579 363.579"
                            style={{
                                enableBackground: "new 0 0 363.579 363.579",
                            }}
                            xmlSpace="preserve">
                            <g>
                                <path d="M360.082,175.411l-82.42-57.744c-1.413-0.99-2.725-1.514-4.249-1.514c-3.307,0-6.413,2.512-6.413,7.313v34.323H161.436 c-4.963,0-9.436,4.167-9.436,9.13v29.75c0,4.963,4.474,9.12,9.436,9.12H267v34.341c0,4.801,3.108,7.659,6.415,7.659 c0.001,0-0.119,0-0.119,0c1.524,0,3.018-0.696,4.43-1.687l82.384-57.826c2.213-1.55,3.467-3.922,3.468-6.432 C363.579,179.335,362.296,176.962,360.082,175.411z" />
                                <path d="M297.943,261.789c-1.384,0-2.678,1.072-2.698,1.092l-20.005,14.014c-0.173,0.114-4.24,2.852-4.24,7.896 c0,1.403,0,5.185,0,7H29v-219h242c0,0,0,4.938,0,6.75c0,4.085,3.98,6.981,4.154,7.105l21.664,15.178 c0.032,0.021,0.795,0.521,1.674,0.521c1.145,0,2.508-0.769,2.508-4.429V65.841c0-12.926-10.126-23.052-23.052-23.052H24.052 C10.79,42.79,0,53.131,0,65.841v230.896l0,0c0,13.036,11.012,24.049,24.048,24.052c0.001,0,0.002,0,0.004,0h0h253.896h0 c0.002,0,0.003,0,0.005,0C290.662,320.787,301,309.998,301,296.738V267.79C301,262.83,299.338,261.789,297.943,261.789z  M299.97,98.723c0.016-0.254,0.03-0.514,0.03-0.809C300,98.179,299.988,98.452,299.97,98.723z M299.92,99.24 c0.008-0.066,0.018-0.125,0.025-0.194C299.938,99.112,299.928,99.175,299.92,99.24z M300,296.738 C300,296.738,300,296.738,300,296.738L300,296.738L300,296.738z M299.989,267.147c0.007,0.216,0.011,0.432,0.011,0.643 C300,267.565,299.995,267.355,299.989,267.147z M299.975,266.811c0.002,0.039,0.005,0.079,0.007,0.119 C299.98,266.888,299.977,266.851,299.975,266.811z" />
                            </g>
                        </svg>
                        Register Here</button>
                </div>
            </section>
            <section className='container flex-wrap flex items-center justify-between xl:max-w-7xl xl:mx-auto bg-white
             max-w-full'>
                <div className='py-6'>
                    <h3 className='block w-full text-center font-ubuntu my-14 text-xl 
                '>Work made easy with  &nbsp;<span>
                            <h1 className='font-extrabold font-logo leading-10 text-transparent tracking-wide 
  text-2xl bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 inline-block'>Phoenix&nbsp;</h1>
                            <span className='text-black font-logo text-l leading-3'>Trek</span>
                        </span>
                    </h3>
                    <img className="w-full lg:px-56 px-20" src="./fullWidthImage.gif" alt="" srcset="" />
                </div>



                <div className='md:w-2/3 w-full  p-5 flex justify-center items-center'>
                    <div className=' bg-purple-700 w-full p-5 rounded-xl'>
                        <h3 className='font-logo text-xl text-white'>About</h3>
                        <p className='text-white'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            <br />
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.                        </p>
                    </div>
                </div>
                <div className='md:w-1/3 w-full '>
                    <img src="./ContentPageGif2.avif" alt="" sizes="" srcset="" />
                </div>
            </section>

        </Fragment>
    )
}

export default LandingPageContent