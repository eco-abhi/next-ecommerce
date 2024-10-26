
import SubMenuDropdown from "./SubMenuDropdown"
import Image from "next/image"

const SubMenu: React.FC<SubMenuProps> = ({ label, submenuItems, backButtonSelected, closeMenu }) => {

    const handleBackButtonClick = () => {
        backButtonSelected(true)
    }

    const handleLinkClick = () => {
        closeMenu(true)
    }

    return (
        <>
            <div className="flex flex-row items-center">
                {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-[25px] h-[25px] text-gray-800"
                    onClick={handleBackButtonClick}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.0}
                        d="M19 5l-7 7 7 7"
                    />
                </svg> */}
                <Image
                    priority
                    src="/left-caret.svg"
                    alt="Go back"
                    className="cursor-pointer"
                    width={25}
                    height={25}
                    onClick={handleBackButtonClick}
                    layout="fixed"
                />

                <h1 className="flex-grow font-semibold text-center text-lg">{label}</h1>
            </div>
            <SubMenuDropdown subMenuItems={submenuItems} closeMenu={handleLinkClick} />
        </>
    )
}

export default SubMenu