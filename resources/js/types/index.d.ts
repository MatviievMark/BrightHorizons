export interface NotificationData {
    id: string;
    type: string;
    message: string;
    created_at: string;
    read_at: string | null;
    user_id: number;
    data?: any; // For any additional data
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: string;
    is_admin: number;
    notifications?: NotificationData[]; 
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
