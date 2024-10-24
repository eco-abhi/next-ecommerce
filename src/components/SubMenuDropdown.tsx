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

                    </Link>
                ))}
            </ul>


        </div>
    )
}

export default SubMenuDropdown