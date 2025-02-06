export const extractUrlAndId = (cloudinaryUrl) => {
    const lastSlashIndex = cloudinaryUrl.lastIndexOf("/")
    const url = cloudinaryUrl.substring(0,lastSlashIndex)
    const id = cloudinaryUrl.substring(lastSlashIndex+1)
    return {url,id}
}