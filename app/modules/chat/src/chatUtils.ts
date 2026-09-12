export const mapPostToChatMessage = (post: chat.Post): chat.Message => {
    const { body, createdAt, id } = post;
    return {
        messageId: id,
        message: body,
        createdAt,
    }
};