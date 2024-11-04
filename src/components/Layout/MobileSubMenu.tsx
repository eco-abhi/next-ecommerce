
import MobileSubMenuDropdown from "./MobileSubMenuDropdown"
import LeftCaret from "../../../public/left-caret.svg";

const MobileSubMenu: React.FC<MobileSubMenuProps> = ({ label, submenuItems, otherCollection, backButtonSelected, closeMenu }) => {

    const handleBackButtonClick = () => {
        backButtonSelected(true)
    }

    const handleLinkClick = () => {
        closeMenu(true)
    }

    return (
        <>
            <div className="flex flex-row items-center bg-[#c3c3e1] bg-opacity-25 p-2 font-geograph">
                <LeftCaret
                    alt="Go back"
                    className="cursor-pointer"
                    width={25}
                    height={25}
                    onClick={handleBackButtonClick}
                />

                <h1 className="flex-grow font-semibold text-center text-lg">{label}</h1>
            </div>
            <MobileSubMenuDropdown subMenuItems={submenuItems} closeMenu={handleLinkClick} otherCollection={otherCollection} />
        </>
    )
}

export default MobileSubMenu