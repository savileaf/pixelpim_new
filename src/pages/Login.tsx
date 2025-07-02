import { MdKey } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center gap-2">
                <img src="../src/assets/logo.png" className="h-[2rem]" />
                <h2 className="text-[#00c965] text-3xl font-semibold">Pixel<span className="text-[#c78500]">PIM</span></h2>
            </div>

            <h2 className="text-[#c78500] text-2xl font-semibold mt-[1.5rem]">
                Welcome to PixelPim
            </h2>

            <div className="flex flex-row gap-2 mt-8">
                <div className="w-[14rem] h-[2rem] flex flex-row items-center justify-center gap-2 border border-gray-200">
                    <img src="../src/assets/Image.png" alt="google" />
                    <p className="text-[0.8rem]">Continue with Google</p>
                </div>
                <div className="w-[14rem] h-[2rem] flex flex-row items-center justify-center gap-2 border border-gray-200">
                    <MdKey className="text-gray-400 text-lg" />
                    <p className="text-[0.8rem]">Continue with Single Sign-on</p>
                </div>
            </div>

            <h2 className="text-[0.8rem] text-gray-400 my-4">or</h2>


            <form className="flex flex-col items-center justify-center gap-4">
                <div className="w-[28rem] border border-gray-200 px-4 py-1 text-[5b5b5b]">
                    <input type="email" placeholder="Enter your email" className="w-full focus:outline-none text-[0.9rem]" />
                </div>

                <div className="relative w-[28rem] border border-gray-200 px-4 py-1 text-[5b5b5b]">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full focus:outline-none text-[0.9rem] pr-8" 
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <div className="flex flex-row justify-between items-center w-full px-1">
                    <div className="flex flex-row items-center justify-start">
                        <input type="checkbox" className="w-4 h-4" />
                        <p className="text-[0.8rem] text-gray-400 ml-2 font-light">Remember me</p>
                    </div>

                    <h2 className="text-[0.9rem] text-gray-400">Forget password?</h2>
                </div>

                <button className="bg-[#2ecc71] text-white w-full py-2">Login </button>
                <h2 className="self-start text-[0.9rem] text-gray-400">New here? <Link to="/" className="text-blue-500">Sign up</Link></h2>
            </form>
        </div>
    )
}

export default Login
