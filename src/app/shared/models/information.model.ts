export interface Information {
    ok:   boolean;
    info: Info;
}

export interface Info {
    _id?:           string;
    name:          string;
    photo_url:     string;
    pic:           string;
    phone_numbers: string;
    email:         string;
    information:   string;
    legal:         string;
    description:   string;
    location:      Location;
    office_hours:  OfficeHours;
}

export interface Location {
    _id?:           string;
    address:       string;
    first_street:  string;
    second_street: string;
    local_number:  string;
    city:          string;
    latitude:      number;
    longitude:     number;
    zipcode:       string;
}

export interface OfficeHours {
    _id?:      string;
    entrance: string;
    exit:     string;
    exit2:    string;
}