type FinchProvider = {
    token: string,
    data: FinchToken
}

type FinchToken = {
    client_id: string,
    company_id: string,
    products: string[],
    username: string,
    payroll_provider_id: string,
    manual: boolean
}

type FinchEmployee = {
    id: string,
    first_name: string,
    middle_name: string,
    last_name: string
    manager: {
        id: string
    },
    department: {
        name: string
    },
    is_active: boolean
}

type FinchDirectory = {
    paging: {
        count: number
        offset: number
    },
    individuals: FinchEmployee[]
}

type FinchIndividual = {
    id: string,
    first_name: string | null,
    middle_name: string,
    last_name: string,
    preferred_name: string,
    emails: {
        data: string,
        type: 'work' | 'personal',
    }[],
    phone_numbers: {
        data: string,
        type: 'work' | 'personal' | null,
    }[],
    gender: 'female' | 'male' | 'other' | 'decline_to_specify' | null,
    dob: string,
    residence: {
        line1: string,
        line2: string,
        city: string,
        state: string,
        postal_code: string,
        country: string
    }
}