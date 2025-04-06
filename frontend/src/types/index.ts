export type User = {
    id: string;
    username: string;
    email: string;
    avatar: string | null;
    is_active: boolean;
    created_at?: string; // Optional for backward compatibility
};

export type PostTagType = {
    name: string;
};

export type PostAuthor = {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
};

export type Post = {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    published_at: string;
    slug: string;
    author: PostAuthor;
    tags: PostTagType[];
    // Optional fields for UI normalization:
    createdAt?: string;
    updated_at?: string;
};

export type ApiResponse<T> = {
    data: T;
    message?: string;
    status: number;
};

export type ApiError = {
    message: string;
    status?: number;
    data?: unknown;
};

export function isApiError(error: unknown): error is ApiError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as ApiError).message === 'string'
    );
}

export type PostFormData = {
    title: string;
    content: string;
    excerpt?: string;
    tags?: string[];
};