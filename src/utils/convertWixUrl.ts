export const convertWixUrl = (wixUrl: string) => {
    // Helper function to convert Wix image URL to CDN URL
    try {
        // Extract the image ID portion from the Wix URL
        const matches = wixUrl.match(/\/(\w+~mv2\.(?:jpg|png|jpeg|gif))/i);
        if (!matches) return null;

        const imageId = matches[1];
        return `https://static.wixstatic.com/media/${imageId}`;
    } catch (error) {
        console.error('Error converting Wix URL:', error);
        return null;
    }
};