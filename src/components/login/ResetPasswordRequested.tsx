import React from 'react'

function ResetPasswordRequested() {
    return (
        <div className="flex justify-center items-center h-scree">
            <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Reset Password Requested</h1>
                <p className="text-lg text-gray-600">Please check your email to reset your password.</p>
            </div>
        </div>

    )
}

export default ResetPasswordRequested