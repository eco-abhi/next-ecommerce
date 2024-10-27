
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
                <Image
                    priority
                    src="/left-caret.svg"
                    alt="Go back"
                    className="cursor-pointer"
                    width={25}
                    height={25}
                    onClick={handleBackButtonClick}
                />

                <h1 className="flex-grow font-semibold text-center text-lg">{label}</h1>
            </div>
            <SubMenuDropdown subMenuItems={submenuItems} closeMenu={handleLinkClick} />
        </>
    )
}

export default SubMenu