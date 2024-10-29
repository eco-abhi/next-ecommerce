import Image from 'next/image';
import Tag from './Tag';
import Link from 'next/link';
import LinkDropdown from './LinkDropdown';

const DesktopSubMenu: React.FC<DesktopMenuDropdownProps> = ({ subMenuItems, otherCollection }) => {

    const handleLinkClick = () => {
        console.log('Link clicked');
    }

    return (
        <div className="flex flex-row gap-32 p-10 bg-[#FCFAF8] w-full justify-center font-josefin_sans">
            {/* Left Column */}
            <div className="flex flex-col space-y-2">
                {/* <h2 className="text-lg font-bold text-white">
                    {"All Items"}
                </h2> */}
                <ul className="space-y-2">
                    <li>All items</li>
                    {subMenuItems.slice(0, 2).map((item, index) => (
                        <li key={item.label}>
                            <Link onClick={handleLinkClick} href={item.href} key={item.label}>
                                <span className="flex-1 link link-underline link-underline-black">{item.label}</span> {/* Text part */}
                                {item.tag && <Tag text={item.tag} />} {/* Conditionally render tag */}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Middle Column */}
            <div className="flex flex-col space-y-2 border-l border-gray-300 pl-6">
                <h2 className="text-lg font-bold">{otherCollection?.label}</h2>
                <ul className="space-y-2">
                    {otherCollection !== undefined && otherCollection.subCollection && (
                        <LinkDropdown links={otherCollection.subCollection} isSubMenu={true} handleCloseMenu={handleLinkClick} />

                    )}
                </ul>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-center">
                <Image src="/menu-assets/bed-submenu.webp" alt="Luxe Sateen" width={200} height={200} className="rounded-md" />
                <a href="#" className="text-lg font-bold text-indigo-700 mt-4">Shop Luxe Sateen &rarr;</a>
            </div>
        </div>
    );
};

export default DesktopSubMenu;
