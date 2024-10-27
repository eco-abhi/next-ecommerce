import React from 'react'

function BottmoModalMessage() {

    const [email, setEmail] = React.useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

    }
    return (
        <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2b3147] leading-tight">
                Enter your email for 20% off your order
            </h2>

            <p className="text-gray-600">
                Your 20% off will be applied in checkout.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                    {/* Email input */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-[#2b3147] text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        Submit
                    </button>

                    {/* Google Sign In button */}
                    <button
                        type="button"
                        className="w-full border border-gray-300 bg-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
                    >
                        <img
                            src="/api/placeholder/18/18"
                            alt="Google"
                            className="w-4 h-4"
                        />
                        <span>Sign in with Google</span>
                    </button>
                </div>

                {/* No thanks link */}
                <button
                    type="button"
                    // onClick={() => setIsOpen(false)}
                    className="w-full text-center text-gray-600 underline hover:text-gray-800"
                >
                    No thanks, I'll pay full price
                </button>

                {/* Privacy notice */}
                <p className="text-sm text-gray-500 mt-4">
                    Please keep me up to date with Brooklinen news and offers by email. I can unsubscribe at any time. I have read the Brooklinen{' '}
                    <a href="#" className="underline hover:text-gray-700">
                        Privacy Policy
                    </a>
                    .
                </p>
            </form>
        </div>
    )
}

export default BottmoModalMessage


