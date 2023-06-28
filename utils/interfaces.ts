export interface UserCreate {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    image?: string;
}

export interface UserCreated {
    _id: string;
    email: string;
    firstName: string;
    lastName: string | null;
    image: string;
    reffersCodes: [];
    inscriptions: [];
    __v: number;
}
