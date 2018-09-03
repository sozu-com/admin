export class Chat {
    conversation_id: number;
    message: string;
    message_type: number; // Text = 1, Image = 2, Video = 3, Attachement = 4
    image: string;
    video: string;
    attachment_name: string;
    attachment: string;
}
