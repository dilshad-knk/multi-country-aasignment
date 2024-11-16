export const priorityBg = (priority: string) => {
    switch (priority) {
        case 'low':
            return 'bg-green-500';
        case 'high':
            return 'bg-yellow-500';
        case 'urgent':
            return 'bg-red-500';
        default:
            return 'bg-yellow-500';
    }
};