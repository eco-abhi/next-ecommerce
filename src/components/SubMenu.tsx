
import SubMenuDropdown from "./SubMenuDropdown"

const SubMenu: React.FC<SubMenuProps> = ({ label, submenuItems, backButtonSelected, closeMenu }) => {

    const handleBackButtonClick = () => {
        backButtonSelected(true)
    }

    const handleLinkClick = () => {
        closeMenu(true)
    }

    return (
        <div className="absolute left-0 top-0 pl-32 pr-64 pt-8 border border-2 border-black w-[95%] h-screen bg-[#FCFAF8]">
            <div className="flex flex-row items-center">
                <svg
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
                        strokeWidth={2}
                        d="M19 5l-7 7 7 7"
                    />
                </svg>
                <h1 className="flex-grow text-2xl font-semibold text-center text-lg">{label}</h1>
            </div>
            <SubMenuDropdown subMenuItems={submenuItems} closeMenu={handleLinkClick} />
        </div>
    )
}

export default SubMenu