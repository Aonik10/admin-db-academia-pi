export interface UserCreate {
    email: string;
    firstName: string;
    lastName?: string;
    password?: string;
    phoneNumber?: string;
    id_document?: number;
    image?: string;
    address?: string;
}

export type UserUpdate = Partial<UserCreate>;

export interface UserCreated extends UserCreate {
    _id: string;
    reffersCodes: [];
    inscriptions: [];
    __v: number;
}
