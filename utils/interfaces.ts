export interface UserCreate {
    email: string;
    firstName: string;
    lastName?: string;
    password?: string;
    phoneNumber?: string;
    id_document?: string;
    image?: string;
    address?: string;
    isActive?: boolean;
}

export type UserUpdate = Partial<UserCreate>;

export interface UserCreated extends UserCreate {
    _id: string;
    reffersCodes: [];
    inscriptions: [];
    __v: number;
}

export interface CourseCreate {
    title: string;
    description: string;
    livePrice?: number;
    onDemandPrice: number;
    image: string;
    tags?: string[];
    onSale?: number;
    isLive?: boolean;
    isOnDemand?: boolean;
    isActive?: boolean;
    duration?: number;
    professor?: string;
    liveDate?: string;
}

export type CourseUpdate = Partial<CourseCreate>;

export interface CourseCreated extends CourseCreate {
    _id: string;
    inscriptions: [];
    __v: number;
}
