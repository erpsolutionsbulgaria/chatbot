export const formatHistory = (historyData) => {
    const result = [];
    const sortedHistory = historyData.sort((a, b) => new Date(a.actionTs).getTime() - new Date(b.actionTs).getTime());
    for (const elem of sortedHistory) {
        result.push({
            role: elem.role,
            content: elem.message
        });
    }
    console.log(' ===== ', result);
    return result;
};
