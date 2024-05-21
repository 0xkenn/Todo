export const truncateText = (text: string, maxLenght: number = 50) => {
    return text.length <= maxLenght ? text : text.substring(0, maxLenght) + '...'; 
}