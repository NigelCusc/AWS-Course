const messages = ['test1', 'test2', 'test3']

export const handler = async(event) => {
    const randomMessage = messages[Math.floor(Math.random()*messages.length)];
    console.log(randomMessage)
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: randomMessage
        }),
    };
    return response;
};
