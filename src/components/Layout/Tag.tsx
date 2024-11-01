import React from 'react'

interface TagProps {
    text: string
}

function Tag({ text }: TagProps) {
    return (
        <span className="inline-flex justify-center items-center px-2 text-sm font-latino font-semibold text-white bg-[#B5BCA6] rounded-full">{text}</span>
    )
}

export default Tag