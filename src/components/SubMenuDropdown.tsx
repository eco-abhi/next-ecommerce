import Link from "next/link";
import Tag from "./Tag";
import LinkDropdown from "./LinkDropdown";


const SubMenuDropdown: React.FC<SubMenuDropdownProps> = ({ subMenuItems, closeMenu, otherCollection }) => {

    const handleLinkClick = () => {
        closeMenu(true)
    }

    return (
        <div className="pt-8">
            <ul className="space-y-2">
                {subMenuItems.slice(0, 2).map((item, index) => (
                    <Link onClick={handleLinkClick} href={item.href} key={item.label} className="flex justify-between items-center text-lg text-[#273455] font-normal border-b-[1px] border-[#DDDDDD] pb-3">

                        <div>
                            <span className="flex-1 pr-4">{item.label}</span> {/* Text part */}
                            {item.tag && <Tag text={item.tag} />} {/* Conditionally render tag */}
                        </div>

                    </Link>
                ))}

                {otherCollection !== undefined && otherCollection.subCollection && (
                    <div
                        key={otherCollection.label}
                        className="text-lg text-[#273455] font-normal border-b-[1px] border-[#DDDDDD] pb-3"
                    >
                        <div className="mb-2 text-left">
                            <span>{otherCollection.label}</span>
                        </div>

                        <LinkDropdown links={otherCollection.subCollection} isSubMenu={true} handleCloseMenu={handleLinkClick} />
                    </div>
                )}


                {/* Remaining items */}
                {subMenuItems.slice(2).map((item, index) => (
                    <Link
                        onClick={handleLinkClick}
                        href={item.href}
                        key={item.label}
                        className="flex justify-between items-center text-lg text-[#273455] font-normal border-b-[1px] border-[#DDDDDD] pb-3"
                    >
                        <div>
                            <span className="flex-1 pr-4">{item.label}</span>
                            {item.tag && <Tag text={item.tag} />}
                        </div>
                    </Link>
                ))}


            </ul>


        </div>
    )
}

export default SubMenuDropdown