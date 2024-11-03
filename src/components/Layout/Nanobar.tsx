
import MessageCarousel from './MessageCarousel'

const Nanobar: React.FC<NanobarProps> = ({ messages }) => {


    return (
        <div
        >   <MessageCarousel messages={messages} autoPlayInterval={5000} /></div>

    );
};

export default Nanobar;