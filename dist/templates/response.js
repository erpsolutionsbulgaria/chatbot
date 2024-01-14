export const fulfillmentObj = (followupEventInput, contexts, payload = false) => {
    if (payload) {
        return {
            fulfillmentMessages: [
                {
                    payload: {
                        quick_replies: {
                            items: [
                                {
                                    title: 'Никоя от изброените',
                                    description: 'Поръчката ми не е сред дадените'
                                }
                            ],
                            title: ''
                        },
                        carousel: {
                            items: [
                                {
                                    button_title: 'Никоя от изброените',
                                    description: 'Поръчката ми не е сред дадените',
                                    title: 'Никоя от изброените'
                                }
                            ]
                        }
                    }
                }
            ],
            followupEventInput,
            outputContexts: contexts
        };
    }
    return {
        followupEventInput,
        outputContexts: contexts
    };
};
