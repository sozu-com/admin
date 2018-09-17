export class Chat {
    conversation_id: number;
    id: number;
    uid: any;
    admin_id: string;
    message: string;
    message_type = 1; // Text = 1, Image = 2, Video = 3, Attachement = 4
    image: string;
    video: string;
    attachment_name: string;
    updated_at: any;
    attachment: string;
    loading: boolean;
    conversation_user: ConversationUser;
    random: number;
}

export class ConversationUser {
    admin_id: string;
}
