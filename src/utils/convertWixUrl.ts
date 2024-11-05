export const convertWixUrl = (wixUrl: string): string | null => {
    try {
        // Replace the Wix-specific prefix with the CDN URL
        const renamedUrl = wixUrl.replace(/^wix:image:\/\/v\d+\//, 'https://static.wixstatic.com/media/');

        // Match up to the first image extension and return
        const match = renamedUrl.match(/(https?:\/\/.*?\.(?:jpg|jpeg|png|gif))/i);
        return match ? match[1] : null;
    } catch (error) {
        console.error('Error converting Wix URL:', error);
        return null;
    }
};
