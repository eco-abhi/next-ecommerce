import Link from "next/link";



const SubMenuDropdown: React.FC<SubMenuDropdownProps> = ({ subMenuItems, closeMenu }) => {

    const handleLinkClick = () => {
        closeMenu(true)
    }
    return (
        <div className="pt-8">
            <ul className="space-y-2">
                {subMenuItems.map((item) => (
                    <Link onClick={handleLinkClick} href={item.href} key={item.label} className="flex justify-between items-center text-lg text-[#273455] font-normal border-b-[1px] border-[#DDDDDD] pb-3">

                        <div>
                            <span className="flex-1 pr-4">{item.label}</span> {/* Text part */}
                            {item.tag && <span className="inline-block px-2 text-sm font-latino font-semibold text-white bg-[#B5BCA6] rounded-full">{item.tag}</span>} {/* Conditionally render tag */}
                        </div>


                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-800"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 5l7 7-7 7"
                            />
                        </svg>

                    </Link>
                ))}
            </ul>


        </div>
    )
}

export default SubMenuDropdown